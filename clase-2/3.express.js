const express = require('express')
const app = express()

const dittoJSON = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by') // desactivar por motivos de seguridad

// --------------------- Middleware ----------------------
app.use(express.json()) // dark magic

/* app.use((req, res, next) => {
  // trackear a la BD
  // revisar si el usuario tiene cookies

  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // aqui solo llegan reques con POST y aplication/json
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la informacion en el req.body
    req.body = data
    next()
  })
})
*/

// ----------------- respuestas -----------------------

app.get('/', (req, res) => {
  // detecta automaticamente el content type
  res.status(200).send('<h1>Mi pagina con Express</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  // detecta automaticamente el content type
  res.json(dittoJSON)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

// la ultima a la que se accede
// use - todas las acciones
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
