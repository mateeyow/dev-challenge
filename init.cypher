LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/entity.csv' AS row
MERGE (a:Entity { node_id: row.node_id, name: row.name, jurisdiction: row.jurisdiction, jurisdiction_description: row.jurisdiction_description, country_codes: row.country_codes, countries: row.countries, incorporation_date: row.incorporation_date, inactivation_date: row.inactivation_date, struck_off_date: row.struck_off_date, closed_date: row.closed_date, ibcRUC: row.ibcRUC, status: row.status, company_type: row.company_type, service_provider: row.service_provider, sourceID: row.sourceID, valid_until: row.valid_until, note: row.note })
RETURN count(a)

LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/intermediary.csv' AS row
MERGE (a:Intermediary { node_id: row.node_id, name: row.name, country_codes: row.country_codes, countries: row.countries, sourceID: row.sourceID, valid_until: row.valid_until, note: row.note })
RETURN count(a)

LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/officer.csv' AS row
MERGE (a:Officer { node_id: row.node_id, name: row.name, country_codes: row.country_codes, countries: row.countries, status: row.status, sourceID: row.sourceID, valid_until: row.valid_until, note: row.note })
RETURN count(a)

LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/other.csv' AS row
MERGE (a:Other { node_id: row.node_id, name: row.name, country_codes: row.country_codes, countries: row.countries, sourceID: row.sourceID, valid_until: row.valid_until, note: row.note })
RETURN count(a)

LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/address.csv' AS row
MERGE (a:Address { node_id: row.node_id, name: row.name, address: row.address, country_codes: row.country_codes, sourceID: row.sourceID, valid_until: row.valid_until, note: row.note })
RETURN count(a)

:auto USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/edges.csv' AS row
MATCH (e:Intermediary { node_id: row.START_ID })
MATCH (a:Officer { node_id: row.END_ID })
MERGE (e)-[rel:same_as { link: row.link, start_date: row.start_date, end_date: row.end_date, sourceID: row.sourceID, valid_until: row.valid_until }]->(a)
RETURN COUNT(rel)

:auto USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/edges.csv' AS row
MATCH (e:Intermediary { node_id: row.START_ID })
MATCH (a:Entity { node_id: row.END_ID })
MERGE (e)-[rel:intermediary_of { link: row.link, start_date: row.start_date, end_date: row.end_date, sourceID: row.sourceID, valid_until: row.valid_until }]->(a)
RETURN COUNT(rel)

:auto USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/edges.csv' AS row
MATCH (e:Officer { node_id: row.START_ID })
MATCH (a:Officer { node_id: row.END_ID })
MERGE (e)-[rel:same_id_as { link: row.link, start_date: row.start_date, end_date: row.end_date, sourceID: row.sourceID, valid_until: row.valid_until }]->(a)
RETURN COUNT(rel)

:auto USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/edges.csv' AS row
MATCH (e:Officer { node_id: row.START_ID })
MATCH (a:Entity { node_id: row.END_ID })
MERGE (e)-[rel:officer_of { link: row.link, start_date: row.start_date, end_date: row.end_date, sourceID: row.sourceID, valid_until: row.valid_until }]->(a)
RETURN COUNT(rel)

:auto USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/edges.csv' AS row
MATCH (e:Entity { node_id: row.START_ID })
MATCH (a:Officer { node_id: row.END_ID })
MERGE (e)-[rel:same_name_as { link: row.link, start_date: row.start_date, end_date: row.end_date, sourceID: row.sourceID, valid_until: row.valid_until }]->(a)
RETURN COUNT(rel)

:auto USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/edges.csv' AS row
MATCH (e:Officer { node_id: row.START_ID })
MATCH (a:Entity { node_id: row.END_ID })
MERGE (e)-[rel:connected_to { link: row.link, start_date: row.start_date, end_date: row.end_date, sourceID: row.sourceID, valid_until: row.valid_until }]->(a)
RETURN COUNT(rel)

:auto USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers/edges.csv' AS row
MATCH (e:Entity { node_id: row.START_ID })
MATCH (a:Address { node_id: row.END_ID })
MERGE (e)-[rel:registered_address { link: row.link, start_date: row.start_date, end_date: row.end_date, sourceID: row.sourceID, valid_until: row.valid_until }]->(a)
RETURN COUNT(rel)
