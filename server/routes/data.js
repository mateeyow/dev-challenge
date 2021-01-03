import neo4j from 'neo4j-driver'
import express from 'express'
import db from '../db'

const router = express.Router()

const relationships = {
  'same_as': ['Intermediary', 'Officer'],
  'intermediary_of': ['Intermediary', 'Entity'],
  'same_id_as': ['Officer', 'Officer'],
  'officer_of': ['Officer', 'Entity'],
  'same_name_as': ['Entity', 'Officer'],
  'connected_to': ['Officer', 'Entity'],
  'registered_address': ['Entity', 'Address'],
}

// Transforms nodes to individual data
const getNode = (node) => {
  const { properties } = node
  return { id: properties.node_id, name: properties.name, properties }
}

// Transforms the data for FE to use
const transformer = (data) => {
  const nodes = []
  const links = []

  if (data.records.length === 0) {
    return { nodes, links }
  }

  data.records?.forEach(r => {
    const record = r.toObject()
    nodes.push(getNode(record.a), getNode(record.b))
    links.push({ type: record.rel.type, source: record.a.properties.node_id, target: record.b.properties.node_id })
  })

  return { nodes, links }
}

router.get('/', async (req, res, next) => {
  const { keyword = '', limit = 1, link } = req.query

  const rel = relationships[link]
  const qLimit = limit >= 1000 ? 1000 : parseInt(limit, 10)

  if (!rel) {
    res.status(400)
    return res.json({ error: 'Invalid link type' })
  }

  const session = db.session({ database: 'neo4j', defaultAccessMode: neo4j.session.READ })

  try {
    const data = await session.run(`
      MATCH (a:${rel[0]})-[rel:${link}]-(b:${rel[1]})
      WHERE a.name CONTAINS "${keyword}"
      RETURN a, rel, b
      LIMIT ${qLimit}
    `)
    res.json(transformer(data))
  } catch (err) {
    console.error(`Encountered error: ${err}`)
    next(err)
  } finally {
    session.close()
  }
})

export default router