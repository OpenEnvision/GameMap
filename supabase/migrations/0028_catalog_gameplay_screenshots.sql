-- Complete gameplay attachments retain original/frame/provenance assets and optional archived covers.
-- Historical readers remain installed unchanged.
begin;
insert into catalog.content_schemas(kind, version, validator_key) values
  ('example', 8, 'gamemap.example'),
  ('foundation', 4, 'gamemap.foundation'),
  ('threejs-game', 4, 'gamemap.threejs-game');
commit;
