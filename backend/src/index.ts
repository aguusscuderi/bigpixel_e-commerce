import express, { Request, Response } from 'express';
require('dotenv').config()
const app = express()

import { authenticate } from './config/database';
import Usuario from './models/user';

import serverRouter from './routes/index'

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const {Server : HttpServer} = require('http')
const server = new HttpServer(app)

serverRouter(app)

authenticate()
.then(() => {
    // Sincroniza el modelo Usuario con la base de datos
    return Usuario.sync();
  })
  .then(() => {
    console.log('Tabla "users" creada o sincronizada exitosamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar o crear la tabla:', error);
  });
// authenticate.sync()
//   .then(() => {
//     console.log('Modelo sincronizado con la base de datos');
//   })
//   .catch((error) => {
//     console.error('Error al sincronizar el modelo:', error);
//   });

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
