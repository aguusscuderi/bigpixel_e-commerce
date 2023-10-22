import { Express, Router, Request, Response } from 'express';
const router = Router()

 export default function serverRouter(app: Express) {
    app.use('/api', router)

    router.get('/raiz', (_req: Request, res: Response) => {
        res.send('En la raiz API. Funciona NODEMON en Docker :D.')
    })
    
    router.post('/login', (_req: Request, res: Response) => {
        const { email, password } = _req.body
        console.log(_req.body)
        console.log(`Email: ${email}, Password: ${password}`)
        res.send(`Email: ${email}, Password: ${password}`)
    })
}

// module.exports = serverRouter