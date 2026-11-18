-- Native, source-reviewed catalog types; registration does not publish any content.
begin;
insert into catalog.content_kinds(kind, label, owner) values
  ('paper', 'Paper', 'database'),
  ('threejs-game', 'Three.js game', 'database');
insert into catalog.content_schemas(kind, version, validator_key) values
  ('paper', 1, 'gamemap.paper'),
  ('threejs-game', 1, 'gamemap.threejs-game'),
  ('example', 2, 'gamemap.example'),
  ('demo', 2, 'gamemap.demo'),
  ('step', 2, 'gamemap.step'),
  ('testing-pack', 2, 'gamemap.testing-pack');
commit;
