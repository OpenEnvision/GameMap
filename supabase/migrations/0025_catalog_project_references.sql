-- Observed project pages with unlocated corresponding source are not source/play links.
-- Append v5 only; all installed v1/v2/v3/v4 readers and historical revisions remain intact.
begin;
insert into catalog.content_schemas(kind, version, validator_key) values
  ('example', 5, 'gamemap.example');
commit;
