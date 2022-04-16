import express, { Express } from 'express'

const port: number = parseInt(process.env.API_PORT || '3000', 10)

const app: Express = express()

app.use(express.json())

app.use('/', (req, res) => {
  res.status(200).json({ status: 'ok!' })
})

app.listen(port, () => console.log('Server listening port', port))
