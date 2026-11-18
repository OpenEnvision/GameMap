-- First-class complete games without a mandatory AI-authorship claim.
-- Installed v1/v2 readers and existing revisions are unchanged.
begin;
insert into catalog.content_schemas(kind, version, validator_key) values
  ('example', 3, 'gamemap.example');
commit;
