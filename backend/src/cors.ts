import cors, { CorsOptions } from 'cors'

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

const initCors = () => cors(corsOption)

export default initCors
