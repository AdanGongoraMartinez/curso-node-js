import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()

app.set('view engine', 'ejs')
app.use(express.json())

app.get('/', (req, res) => {
  res.render('protected', { username: 'Adan' })
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    res.send({ user })
  } catch (error) {
    res.status(401).send(error.message)
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body // Body es informacion que pasa el usuario con POST

  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    // Normalmente no es buena idea MANDAR EL ERROR DEL REPOSITORIO
    res.status(400).send(error.message)
  }
})

app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server runnig in http://localhost:${PORT}`)
})
