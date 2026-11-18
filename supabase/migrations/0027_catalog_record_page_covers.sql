-- Operator-approved local GameMap record-page covers are not upstream pages.
-- Retain the external-only v6/v2/v2 readers installed by 0026 unchanged.
begin;
insert into catalog.content_schemas(kind, version, validator_key) values
  ('example', 7, 'gamemap.example'),
  ('foundation', 3, 'gamemap.foundation'),
  ('threejs-game', 3, 'gamemap.threejs-game');
commit;
