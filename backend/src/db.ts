import { connect, ConnectOptions, set } from 'mongoose'

const { MONGO_PORT, MONGO_DB, MONGO_HOSTNAME, MONGO_USERNAME, MONGO_PASSWORD } =
  process.env

const mongoUrl = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}`

const clientOptions: ConnectOptions = {
  user: MONGO_USERNAME,
  pass: MONGO_PASSWORD,
  dbName: MONGO_DB
}

const connectdb = async (): Promise<void> => {
  try {
    set('strictQuery', true)
    await connect(mongoUrl, clientOptions)

    console.log('bdd connecté')
  } catch ({ message }) {
    console.log('bdd pas connecté :', message)
  }
}

export default connectdb
