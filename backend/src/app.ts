import express, { Express } from 'express'
import cors, { CorsOptions } from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import markRoutes from './routes/mark'
import userRoutes from './routes/user'

const corsOption: CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content',
    'Accept',
    'Content-Type',
    'Authorization'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}
const {
  API_PORT,
  MONGO_PORT,
  MONGO_DB,
  MONGO_HOSTNAME,
  MONGO_USERNAME,
  MONGO_PASSWORD
} = process.env
const port: number = parseInt(API_PORT || '3000', 10)
const mongoUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`
const clientOptions = {
  useNewUrlParser: true,
  dbName: MONGO_DB
}

mongoose
  .connect(mongoUrl, clientOptions)
  .then(() => console.log('bdd connecté'))
  .catch(() => console.log('bdd pas connecté'))

const app: Express = express()

app.use(express.json())
app.use(cors(corsOption))

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/v1/notes', markRoutes)
app.use('/v1/auth', userRoutes)

app.listen(port, () => console.log('Server listening port', port))
