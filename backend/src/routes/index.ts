import { Express, Router, Request, Response } from 'express';
const router = Router()

 export default function serverRouter(app: Express) {
    app.use('/api', router)

    router.get('/raiz', (_req: Request, res: Response) => {
        res.send('En la raiz API. Probando cambios')
    })
}

// module.exports = serverRouter