import neo4j from 'neo4j-driver'

const {
  NEO_USERNAME = 'neo4j',
  NEO_PASSWORD = 'refinitiv',
  NEO_URL = 'neo4j://localhost',
} = process.env

console.info("NEO_URL", NEO_URL);

const driver = neo4j.driver(NEO_URL, neo4j.auth.basic(NEO_USERNAME, NEO_PASSWORD))

export default driver
