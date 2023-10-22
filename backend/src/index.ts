require('dotenv').config()
import express, { Request, Response } from 'express';
const app = express()
const cors = require('cors')

import { db_sync } from './config/database';

import Usuario from './models/user';
import Products from './models/products';

import serverRouter from './routes/index'

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const {Server : HttpServer} = require('http')
const server = new HttpServer(app)

const whitelist = ['http://localhost:5173']
const corsConfig = {
    origin: function(origin: any, callback: any) {
        if (whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error('Not allowed'))
        }
    },
    credentials: true
}
app.use(cors(corsConfig))

serverRouter(app)

db_sync()
  .then(() => {
      // Sincroniza el modelo Usuario con la base de datos
      const tables = [Usuario, Products]
      return tables.forEach(el => el.sync());
    })
    .then(() => {
      console.log('Tablas "users" creada o sincronizada exitosamente');
    })
    .catch((error) => {
      console.error('Error al sincronizar o crear la tabla:', error);
    });

const PORT = process.env.PORT || 5000

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
