-- Optional, source-evidenced game builds on research records. Existing v1 readers remain installed.
begin;
insert into catalog.content_schemas(kind, version, validator_key) values
  ('repository-research', 2, 'gamemap.repository-research');
commit;
