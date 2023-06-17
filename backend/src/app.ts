import express, { Express } from 'express'
import logger from 'morgan'
import path from 'path'
import connectdb from './db'
import initCors from './cors'
import markRoutes from './routes/mark'
import userRoutes from './routes/user'
import isLoged from './middleware/isLoged'

connectdb()

const port: number = parseInt(process.env.API_PORT || '3000', 10)

const app: Express = express()

app.use(logger('dev'))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(initCors())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/v1/notes', isLoged, markRoutes)
app.use('/v1/auth', userRoutes)

app.listen(port, () => console.log('Server listening port', port))
