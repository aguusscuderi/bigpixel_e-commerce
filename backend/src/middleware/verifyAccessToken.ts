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
    if(!token) return res.status(400).send({err: 'Invalid Authentication'})

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload
    if(!decoded) return res.status(400).send({err: 'Invalid Authentication'})

    const user: User | null = await Users.findOne({ where: { id: decoded.id } })

    if (!user) 
        return res.status(404).send({ err: 'User not found' });
    else
        return {id: user.id, role: user.role, root: user.root};
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
