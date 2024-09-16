import express from 'express'
import morgan from 'morgan' // logger
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

import { Server } from 'socket.io'
import { createServer } from 'node:http'

dotenv.config() // read enviroment variables
const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {
        maxDisconnectionDuration: {}
    }
})

const db = createClient({
    url: 'libsql://magical-fantomette-adangongora.turso.io',
    authToken: process.env.DB_TOKEN
})

// normally uuid is used insted of integer autoincrement
/* await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     content TEXT NOT NULL
    );
`) */

io.on('connection', async (socket) => {
    console.log('a user has connected')

    socket.on('disconnect', () => {
        console.log('a user has disconnected')
    })

    socket.on('chat message', async (msg) => {
        let result
        const username = socket.handshake.auth.username ?? 'anonymus'

        try {
            result = await db.execute({
                sql: 'INSERT INTO messages (content, user) VALUES (:msg, :username)',
                args: { msg, username } // Avoid sql inyection
            })
        } catch (e) {
            console.log(e)
            return
        }

        io.emit('chat message', msg, result.lastInsertRowid.toString(), username)
    })

    if (!socket.recovered) { // get offline messages
        try {
            const results = await db.execute({
                sql: 'SELECT id, content, user FROM messages WHERE id > ?',
                args: [socket.handshake.auth.serverOffset ?? 0]
            })

            results.rows.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString(), row.user)
            })
        } catch (e) {
            console.log(e)
        }
    }
})

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`)
})
