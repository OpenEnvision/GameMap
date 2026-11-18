-- User-provided game directories may have source references but no verified build.
-- The additive v4 reader labels these explicitly; installed v1/v2/v3 stay unchanged.
begin;
insert into catalog.content_schemas(kind, version, validator_key) values
  ('example', 4, 'gamemap.example');
commit;
