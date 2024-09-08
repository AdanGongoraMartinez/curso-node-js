const http = require('node:http') // protocolo HTTP
const { findAvailablePort } = require('./10.free-port.js')

// variable de entorno
// PORT=1234 node 9.http.js
// archivo .env es parte de una biblioteca de dependencias
const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
