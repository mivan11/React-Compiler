const app = require('./index')  
const http = require('http')

const server = http.createServer(app)

/*server.listen(config.PORT, () => {
  logger.info(`Server je pokrenut na portu ${config.PORT}`)
})*/