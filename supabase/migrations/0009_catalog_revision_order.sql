-- Deterministic append order must not depend on equal timestamps or random UUID ordering.
begin;
alter table catalog.revisions add column sequence bigint generated always as identity unique;
create index revision_append_order on catalog.revisions(entry_key, sequence desc);
commit;
