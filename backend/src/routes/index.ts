import { Express, Router, Request, Response } from 'express';
const router = Router()

import register from '../auth/register'
import login from '../auth/login'

 export default function serverRouter(app: Express) {
    app.use('/api', router)

    router.get('/raiz', (_req: Request, res: Response) => {
        res.send('En la raiz API. Funciona NODEMON en Docker :D.')
    })
    
    router.post('/login', (req: Request, res: Response) => {
        login(req, res)
    })

    router.post('/register', (req: Request, res: Response) => {
        register(req, res)
    })
}

// module.exports = serverRouter