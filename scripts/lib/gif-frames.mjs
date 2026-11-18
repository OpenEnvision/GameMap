import assert from "node:assert/strict";

// Retain only verbatim, complete frames from a bounded prefix of an author GIF.
// This changes the container ending, never scene pixels or frame geometry.
export function completeGIFPrefix(bytes, maxFrames = 500) {
  assert.ok(
    /^GIF8[79]a/.test(bytes.toString("ascii", 0, 6)) && bytes.length >= 13,
    "Not a complete GIF header",
  );
  let p = 13 + (bytes[10] & 128 ? 3 * (1 << ((bytes[10] & 7) + 1)) : 0),
    end = 0,
    frames = 0,
    complete = false;
  assert.ok(p <= bytes.length, "Incomplete global color table");
  const subblocks = (start) => {
    let i = start;
    while (i < bytes.length) {
      const n = bytes[i++];
      if (n === 0) return i;
      if (i + n > bytes.length) return null;
      i += n;
    }
    return null;
  };
  while (p < bytes.length && frames < maxFrames) {
    const tag = bytes[p];
    if (tag === 0x3b) {
      complete = true;
      break;
    }
    if (tag === 0x21) {
      if (p + 2 > bytes.length) break;
      const next = subblocks(p + 2);
      if (next === null) break;
      p = next;
      continue;
    }
    assert.equal(tag, 0x2c, "Unexpected GIF block");
    if (p + 10 > bytes.length) break;
    const packed = bytes[p + 9];
    p += 10;
    if (packed & 128) p += 3 * (1 << ((packed & 7) + 1));
    if (p >= bytes.length) break;
    const next = subblocks(p + 1);
    if (next === null) break;
    p = next;
    end = p;
    frames++;
  }
  assert.ok(frames > 0, "No complete GIF image frame in the bounded response");
  return {
    bytes: Buffer.concat([bytes.subarray(0, end), Buffer.from([0x3b])]),
    frames,
    complete,
  };
}
