const http = require('node:http') // protocolo HTTP
const fs = require('node:fs')

// variable de entorno
// PORT=1234 node 9.http.js
// archivo .env es parte de una biblioteca de dependencias
const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf8')

  if (req.url === '/') {
    // res.statusCode = 200 // OK - defaut status code
    res.end('<h1>Bienvenido a mi página de Inicio</h1>')
  } else if (req.url === '/contacto') {
    // res.statusCode = 200 // OK - defaut status code
    res.end('<h1>Contacto</h1>')
  } else if (req.url === '/imagen.png') {
    fs.readFile('./imagen.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404 // NOT FOUND
    res.end('<h1>404 No existe</h1>')
  }
}

// Para actualizar el servidor usar:
// node --watch 1.http.js
// rpm run dev para usar nodemon
const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
