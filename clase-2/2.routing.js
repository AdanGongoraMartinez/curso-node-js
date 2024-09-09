// Primera API!
const http = require('node:http')

const dittoJSON = require('./pokemon/ditto.json')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':{
          res.setHeader('Content-Type', 'application/json; charset=utf8')
          return res.end(JSON.stringify(dittoJSON))
        }
        default:{
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf8')
          return res.end('<h1>404<h1>')
        }
      }
    case 'POST':
      switch (url) {
        case '/pokemon':{
          let body = ''

          // escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)

            // 201 - creacion de recurso
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf8' })
            /* res.statusCode = 201
            res.setHeader('Content-Type', 'application/json; charset=utf8') */

            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })

          break
        }
        default:{
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf8')
          return res.end('<h1>404<h1>')
        }
      }
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
