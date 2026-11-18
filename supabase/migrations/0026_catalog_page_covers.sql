-- Page captures are separate fallback media, never reviewed gameplay screenshots.
-- Append handlers only; installed readers and historical revisions remain intact.
begin;
insert into catalog.content_schemas(kind, version, validator_key) values
  ('example', 6, 'gamemap.example'),
  ('foundation', 2, 'gamemap.foundation'),
  ('threejs-game', 2, 'gamemap.threejs-game');
commit;
