import { Express, Router, Request, Response } from 'express';
const router = Router()

import register from '../auth/register'

 export default function serverRouter(app: Express) {
    app.use('/api', router)

    router.get('/raiz', (_req: Request, res: Response) => {
        res.send('En la raiz API. Funciona NODEMON en Docker :D.')
    })
    
    router.post('/login', (req: Request, res: Response) => {
        const { email, password } = req.body
        console.log(req.body)
        console.log(`Email: ${email}, Password: ${password}`)
        res.send(`Email: ${email}, Password: ${password}`)
    })

    router.post('/register', (req: Request, res: Response) => {
        const { email, password, name } = req.body
        register(email, password)
    })
}

// module.exports = serverRouter