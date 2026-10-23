-- Initial declarations, checked against the typed model and import strategies in tests.
-- Future kinds, languages and schema versions use new registry rows in a new numbered migration.
-- Historical declarations and core tables are not rewritten to add a content category.
begin;
insert into catalog.content_kinds(kind, label, owner) values
  ('resource', 'Resource', 'database'),
  ('example', 'Game example', 'database'),
  ('foundation', 'Engine foundation', 'database'),
  ('agent', 'Agent resource', 'database'),
  ('testing', 'Testing resource', 'database'),
  ('testing-pack', 'Testing starter', 'database'),
  ('repository-research', 'Repository research record', 'database'),
  ('path', 'Development path', 'database'),
  ('step', 'Path step', 'database'),
  ('demo', 'Project demo', 'database'),
  ('collection', 'Discovery collection', 'database'),
  ('document', 'Document', 'git');
insert into catalog.content_schemas(kind, version, validator_key) values
  ('resource', 1, 'gamemap.resource'),
  ('example', 1, 'gamemap.example'),
  ('foundation', 1, 'gamemap.foundation'),
  ('agent', 1, 'gamemap.agent'),
  ('testing', 1, 'gamemap.testing'),
  ('testing-pack', 1, 'gamemap.testing-pack'),
  ('repository-research', 1, 'gamemap.repository-research'),
  ('path', 1, 'gamemap.path'),
  ('step', 1, 'gamemap.step'),
  ('demo', 1, 'gamemap.demo'),
  ('collection', 1, 'gamemap.collection'),
  ('document', 1, 'gamemap.document');
insert into catalog.locales(code) values ('en'), ('zh');
insert into catalog.link_roles(key, label) values
  ('code', 'Code'), ('demo', 'Demo'), ('evidence', 'Evidence'),
  ('reference', 'Reference'), ('rights', 'Rights and license');
insert into catalog.relation_types(key, label) values
  ('belongs-to', 'Belongs to'), ('catalog-resource', 'Catalog resource'),
  ('demonstrates', 'Demonstrates'), ('features', 'Features'),
  ('related', 'Related content'), ('uses-resource', 'Uses resource');
commit;
