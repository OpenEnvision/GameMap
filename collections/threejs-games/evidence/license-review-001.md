# License correction 001 — 2026-10-21

HexGL is removed from the ordinary open-source game index and retained as a pending candidate. The first draft inspected the root MIT license and audio exceptions but missed restrictive headers on active core files. This correction applies to both open research PRs; it does not alter the legacy root README's existing listing.

## Pinned evidence

- [Root LICENSE](https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/LICENSE) states MIT.
- [README licensing section](https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/README.md#L9) states that MIT is the default unless a file specifies another license.
- [Active renderer HexGL.js, lines 1–6](https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/bkcore/hexgl/HexGL.js#L1-L6) retains a Creative Commons Attribution-NonCommercial 3.0 Unported notice.
- [Active Gameplay.js, lines 1–6](https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/bkcore/hexgl/Gameplay.js#L1-L6) retains the same noncommercial notice.
- [audio/LICENSE](https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/audio/LICENSE) separately documents audio terms; those notices never made all media MIT.

## Relicense history checked

The author merged [upstream PR #32, Switch to the MIT License](https://github.com/BKcore/HexGL/pull/32), addressing [license request #29](https://github.com/BKcore/HexGL/issues/29). Its [file diff](https://github.com/BKcore/HexGL/pull/32/files) adds the root LICENSE and changes README's default license while retaining the file-exception clause. It does not update either core file header. This review found no explicit statement resolving the continuing per-file notices. The existence of a root MIT file, badge or merged relicense PR is therefore not used to assert a uniform MIT code grant.

This is a catalog eligibility decision based on conflicting repository notices, not a legal determination. Reconsider the candidate when upstream clarifies the effective core-code license or changes those file notices. No author was contacted, no code/assets were redistributed, and no game was run.

## Additional source-header disclosure

[Terrinha's root LICENSE](https://github.com/martinsmiguel/terrinha/blob/ad665d1e00c14a505c1e31eb1bc2bfd1fb3d0fb2/LICENSE) is MIT, while its reviewed active engine, victory and App sources declare Apache-2.0. Those are recorded as mixed/conflicting notices instead of being flattened to MIT; both are open-source licenses, so the record remains in the index with an explicit scope caveat. See its pinned entry and batch 005 evidence for those exact paths.
