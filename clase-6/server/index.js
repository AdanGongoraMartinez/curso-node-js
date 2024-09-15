import express from 'express'
import morgan from 'morgan' // logger

const port = process.env.PORT ?? 3000

const app = express()
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})

app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`)
})
