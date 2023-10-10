import express, { Request, Response } from 'express';
require('dotenv').config()
const app = express()

import serverRouter from './routes/index';

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const {Server : HttpServer} = require('http')
const server = new HttpServer(app)

serverRouter(app)

const PORT = 5000

app.get('/:params', (req: Request, res: Response) => {
    const notFound = {
        error: -1,
        desc: `Error: /${req.params.params}. La URL ${req.method} no esta autorizada.`
    }
    res.send(notFound)
})

server.listen(PORT, ()=> {
    console.log(`Estas conectado a http://localhost:${PORT}`)
})
