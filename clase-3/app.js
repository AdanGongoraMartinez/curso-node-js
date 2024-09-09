const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by') // hace publicidad gratis de express

app.get('/', (req, res) => {
  // detecta automaticamente el content type
  res.send('<h1>Mi pagina con Express</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
