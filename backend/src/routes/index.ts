import { Express, Router, Request, Response } from 'express';
const router = Router()

import { register, verifyAccount} from '../auth/register'
import login from '../auth/login'
import { addProducts, readProducts } from '../controllers/products/products.controller'


import { googleOAuthHandler }  from '../controllers/auth/session.controller'

 export default function serverRouter(app: Express) {
    app.use('/api', router)
    
    // GETS:
    router.get('/sessions/oauth/google', googleOAuthHandler)
    router.get('/products/all', (req: Request, res: Response) => { readProducts (req, res) })
    router.get('/user/confirm/:token', (req: Request, res: Response) => { verifyAccount(req, res) }) 

    // POSTS: 
    router.post('/products/add', (req: Request, res: Response) => { addProducts (req, res) })
    router.post('/login', (req: Request, res: Response) => { login(req, res) })
    router.post('/register', (req: Request, res: Response) => { register(req, res) })

}

// module.exports = serverRouter