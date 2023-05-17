
import express, { Request, Response, NextFunction } from 'express'  
import usersRoute from './routes/users.route'
import statusRoute from './routes/status.route'

const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use(usersRoute)
server.use(statusRoute)

server.listen(3000, () => {
    console.log('Executando na porta 3000, http://localhost:3000')
})