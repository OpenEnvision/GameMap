-- Read the catalog's authoring metadata without exposing its private import archive.
begin;
create function catalog.source_configuration() returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select c.context -> 'configuration'
       from catalog.deployment_state d
       join catalog.release_contexts c on c.release_id = d.release_id
      where d.singleton),
    (select jsonb_build_object(
       'version', 1,
       'research', (b.snapshot #> '{archive,sources,repositoryResearch}') - 'records',
       'agentLabels', b.snapshot #> '{archive,sources,agentLabels}',
       'agentResourceKinds', b.snapshot #> '{archive,sources,agentResourceKinds}',
       'testingKinds', b.snapshot #> '{archive,sources,testingKinds}',
       'testingUses', b.snapshot #> '{archive,sources,testingUses}',
       'testingTerms', b.snapshot #> '{archive,sources,testingTerms}',
       'order', (select jsonb_agg(e ->> 'key' order by position)
                   from jsonb_array_elements(b.snapshot -> 'entries') with ordinality as rows(e, position)))
       from catalog.import_batches b
      where b.snapshot #> '{archive,sources}' is not null
      order by b.imported_at, b.digest limit 1)
  )
$$;
grant execute on function catalog.source_configuration() to catalog_backend;
commit;
