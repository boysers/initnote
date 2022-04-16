const API_URL = `http://${process.env.API_HOSTNAME}:${process.env.API_PORT}`

const PROXY_CONFIG = {
  '/api': {
    target: API_URL,
    secure: false,
    pathRewrite: {
      '^/api': ''
    }
  }
}

module.exports = PROXY_CONFIG
