import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import db from './db'
import dataRoutes from './routes/data'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

process.on('beforeExit', async () => {
  // Close database
  await db.close()
})

app.use('/data', dataRoutes)

module.exports = app
