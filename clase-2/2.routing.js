// Primera API!
const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {

}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
