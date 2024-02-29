"use strict";
// import jwt, { JwtPayload } from 'jsonwebtoken'
// import Users from '../models/user'
// import { Request, Response } from "express"
// interface User {
//     _id: string,
//     name: string,
//     email: string,
//     role: string,
//     avatar: string,
//     root: boolean
//   }  
// const auth = async (req: Request, res: Response) => {
//     const token = req.headers.authorization;
//     if(!token) return res.status(400).send({err: 'Invalid Authentication'})
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload
//     if(!decoded) return res.status(400).send({err: 'Invalid Authentication'})
//     const user: User = await Users.findOne({ where: { id: decoded.id } })
//     return {id: user._id, role: user.role, root: user.root};
// }
// export default auth
