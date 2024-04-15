import jwt, { JwtPayload } from 'jsonwebtoken'
import Users from '../models/user'
import { Request, Response } from "express"

interface User {
    id: number
    name: string
    email: string
    password: string
    role: string
    verified: boolean
    root: string
}  

export const authByHeader = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.json({ status: false, detail: 'Not any header authentication token.' });
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
        if (!decoded) return res.json({ status: false, detail: 'Invalid Authentication.' });

        const user: User | null = await Users.findOne({ where: { id: decoded.id } });

        if (!user)
            return res.json({ status: false, detail: 'User not found.' });
        else
            return res.json({ status: true, token: token, user: {email: user.email, id: user.id, role: user.role, root: user.root} });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ err: 'Internal Server Error' });
    }
}

export const authByParams = async (token: string) => {
    let verifiedData = null
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload
    if(!decoded) 
        return console.log('INVALID AUTHENTICATION!')
    else
        verifiedData = decoded

    return verifiedData
}
