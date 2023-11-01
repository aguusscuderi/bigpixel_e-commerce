import { Express, Router, Request, Response } from 'express';
const router = Router()

import register from '../auth/register'
import login from '../auth/login'

import { googleOAuthHandler }  from '../controllers/auth/session.controller'

 export default function serverRouter(app: Express) {
    app.use('/api', router)
    
    // DELETES:
    // UPDATES:

    // GETS:


    router.get('/sessions/oauth/google', googleOAuthHandler)

    // POSTS: 
    router.post('/login', (req: Request, res: Response) => { login(req, res) })
    router.post('/register', (req: Request, res: Response) => { register(req, res) })
}

// module.exports = serverRouter