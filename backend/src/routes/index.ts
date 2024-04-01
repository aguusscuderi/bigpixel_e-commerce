import { Express, Router, Request, Response } from 'express';
const router = Router()

//Auth:
import { directLogin, directRegister, googleOAuthHandler } from '../controllers/auth/session.controller'
import { verifyAccount } from '../service/auth/verifyAccount.service';
import { getProducts } from '../service/filter/filter.service';
// import login from '../auth/login'

//Products:
import { addProducts, readProducts } from '../controllers/products/products.controller'

 export default function serverRouter(app: Express) {
    app.use('/api', router)
    
    // GETS:
    router.get('/sessions/oauth/google', googleOAuthHandler)
    router.get('/products', getProducts)
    // router.get('/products/all', (req: Request, res: Response) => { readProducts (req, res) })
    router.get('/user/confirm/:token', (req: Request, res: Response) => { verifyAccount(req, res) }) 

    // POSTS: 
    router.post('/products/add', (req: Request, res: Response) => { addProducts (req, res) })
    router.post('/login', (req: Request, res: Response) => { directLogin(req, res) })
    router.post('/register', (req: Request, res: Response) => { directRegister(req, res) })

}
