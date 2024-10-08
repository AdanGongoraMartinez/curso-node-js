import express, { json } from 'express'
import { createMoviesRouter } from './routes/movies.routes.js'
import { corsMiddleware } from './middlewares/cors.js'
// import 'dotenv/config' // cargar variables de entorno

// leer el json en ESmodules
// *********** Opcion 1 *************
/* import fs from 'node:fs'
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) */

// *********** Opcion Recomendada Por ahora *************
// utils.js

const PORT = process.env.PORT ?? 1234

export const createApp = ({ movieModel }) => {
  const app = express()

  app.disable('x-powered-by') // hace publicidad gratis de express

  app.use(json())

  app.use(corsMiddleware())

  // routing
  app.use('/movies', createMoviesRouter({ movieModel }))

  app.use((req, res) => {
    res.status(200).send('<h1>Mi pagina de peliculas</h1>')
  })

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
