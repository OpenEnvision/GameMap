import assert from "node:assert/strict";

// Read actual MP4 atoms so manifest claims cannot hide incompatible or damaged video.
export function inspectMp4(bytes, label) {
  function boxes(start, end) {
    const result = [];
    let offset = start;
    while (offset < end) {
      assert.ok(offset + 8 <= end, `Incomplete MP4 box header: ${label}`);
      let size = bytes.readUInt32BE(offset),
        header = 8;
      const type = bytes.toString("ascii", offset + 4, offset + 8);
      if (size === 1) {
        assert.ok(offset + 16 <= end);
        size = Number(bytes.readBigUInt64BE(offset + 8));
        header = 16;
      }
      if (size === 0) size = end - offset;
      assert.ok(
        Number.isSafeInteger(size) && size >= header && offset + size <= end,
        `Invalid MP4 ${type} box: ${label}`,
      );
      result.push({
        type,
        start: offset,
        body: offset + header,
        end: offset + size,
      });
      offset += size;
    }
    return result;
  }
  const children = (box) => boxes(box.body, box.end);
  const required = (list, type) => {
    const box = list.find((box) => box.type === type);
    assert.ok(box, `Missing MP4 ${type} box: ${label}`);
    return box;
  };
  const requireBytes = (box, size) =>
    assert.ok(
      box.body + size <= box.end,
      `Truncated MP4 ${box.type} box: ${label}`,
    );
  const top = boxes(0, bytes.length);
  assert.equal(top[0]?.type, "ftyp", `Invalid MP4 signature: ${label}`);
  const ftyp = required(top, "ftyp");
  requireBytes(ftyp, 8);
  assert.equal(
    (ftyp.end - ftyp.body) % 4,
    0,
    `Invalid MP4 file type: ${label}`,
  );
  const moov = required(top, "moov"),
    mdat = required(top, "mdat");
  requireBytes(mdat, 1);
  assert.ok(
    moov.start < mdat.start,
    `Video must start progressively: ${label}`,
  );
  const tracks = children(moov)
    .filter((box) => box.type === "trak")
    .map((trak) => {
      const trackBoxes = children(trak),
        mdia = required(trackBoxes, "mdia"),
        mediaBoxes = children(mdia);
      const hdlr = required(mediaBoxes, "hdlr");
      requireBytes(hdlr, 12);
      return {
        trackBoxes,
        mediaBoxes,
        handler: bytes.toString("ascii", hdlr.body + 8, hdlr.body + 12),
      };
    });
  const videos = tracks.filter((track) => track.handler === "vide");
  assert.equal(videos.length, 1, `One video track required: ${label}`);
  const video = videos[0],
    tkhd = required(video.trackBoxes, "tkhd"),
    mdhd = required(video.mediaBoxes, "mdhd");
  requireBytes(mdhd, 1);
  requireBytes(tkhd, 1);
  assert.ok(
    bytes[tkhd.body] === 0 || bytes[tkhd.body] === 1,
    `Unsupported track header: ${label}`,
  );
  requireBytes(tkhd, bytes[tkhd.body] === 1 ? 96 : 84);
  const version = bytes[mdhd.body];
  assert.ok(
    version === 0 || version === 1,
    `Unsupported media header: ${label}`,
  );
  requireBytes(mdhd, version === 1 ? 32 : 20);
  const timescale = bytes.readUInt32BE(mdhd.body + (version === 1 ? 20 : 12));
  const duration =
    version === 1
      ? Number(bytes.readBigUInt64BE(mdhd.body + 24))
      : bytes.readUInt32BE(mdhd.body + 16);
  assert.ok(
    timescale > 0 && Number.isSafeInteger(duration) && duration > 0,
    `Invalid MP4 duration: ${label}`,
  );
  const stbl = required(children(required(video.mediaBoxes, "minf")), "stbl");
  const tables = children(stbl),
    stsd = required(tables, "stsd"),
    stts = required(tables, "stts");
  requireBytes(stsd, 8);
  requireBytes(stts, 8);
  assert.equal(
    bytes.readUInt32BE(stsd.body + 4),
    1,
    `One video sample format required: ${label}`,
  );
  const sampleEntries = boxes(stsd.body + 8, stsd.end);
  assert.equal(
    sampleEntries.length,
    1,
    `One video sample entry required: ${label}`,
  );
  assert.equal(
    sampleEntries[0]?.type,
    "avc1",
    `Browser-compatible H.264 required: ${label}`,
  );
  requireBytes(sampleEntries[0], 78);
  const avcC = required(
    boxes(sampleEntries[0].body + 78, sampleEntries[0].end),
    "avcC",
  );
  requireBytes(avcC, 7);
  assert.equal(bytes[avcC.body], 1, `Invalid AVC configuration: ${label}`);
  const timingEntries = bytes.readUInt32BE(stts.body + 4);
  let samples = 0,
    ticks = 0;
  assert.equal(
    stts.body + 8 + timingEntries * 8,
    stts.end,
    `Invalid sample timing table: ${label}`,
  );
  for (let index = 0; index < timingEntries; index++) {
    const offset = stts.body + 8 + index * 8,
      count = bytes.readUInt32BE(offset),
      delta = bytes.readUInt32BE(offset + 4);
    samples += count;
    ticks += count * delta;
  }
  assert.ok(
    Number.isSafeInteger(samples) &&
      Number.isSafeInteger(ticks) &&
      samples > 0 &&
      ticks > 0,
    `Invalid MP4 timing: ${label}`,
  );
  const width = bytes.readUInt32BE(tkhd.end - 8) / 65536,
    height = bytes.readUInt32BE(tkhd.end - 4) / 65536;
  assert.ok(
    width > 0 && height > 0 && width * height <= 40_000_000,
    `Invalid MP4 dimensions: ${label}`,
  );
  return {
    width,
    height,
    durationSeconds: duration / timescale,
    frameRate: samples / (ticks / timescale),
    audioTracks: tracks.filter((track) => track.handler === "soun").length,
    codec: sampleEntries[0].type,
  };
}
