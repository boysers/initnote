import express, { Express } from 'express'
import connectdb from './db'
import initCors from './cors'
import path from 'path'
import markRoutes from './routes/mark'
import userRoutes from './routes/user'
import isLoged from './middleware/isLoged'

connectdb()

const port: number = parseInt(process.env.API_PORT || '3000', 10)

const app: Express = express()

app.use(express.json())
app.use(initCors())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/v1/notes', isLoged, markRoutes)
app.use('/v1/auth', userRoutes)

app.listen(port, () => console.log('Server listening port', port))
