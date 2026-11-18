-- Research game screenshots share the example media contract; installed v1/v2 readers stay unchanged.
begin;
insert into catalog.content_schemas(kind, version, validator_key) values
  ('repository-research', 3, 'gamemap.repository-research');
commit;
