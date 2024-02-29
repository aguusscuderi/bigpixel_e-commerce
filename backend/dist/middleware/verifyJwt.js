"use strict";
// import Users from "../models/user";
// import { Request, Response } from "express"
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { createAccessToken } from "../utils/auth/generateToken";
// interface User {
//     _id: string,
//     name: string,
//     email: string,
//     role: string,
//     avatar: string,
//     root: boolean
//   }  
// const verifyJwt = async (req: Request, res: Response) => {
//     try {
//       const refreshToken = req.headers["x-refresh-token"]
//       if (!refreshToken) return res.status(400).send({ err: "Please login now" });
//       const decoded = jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload
//       if (!decoded)  return res.status(400).send({ err: "Your token is incorrect or has expired" });
//     //   const user: User | null = await Users.findById(decoded.id);
//       const user: User = await Users.findOne({ where: { id: decoded.id } })
//       if (!user) return res.status(400).send({ err: "User does not exist" });
//       const access_token = createAccessToken({ id: user._id });
//       res.json({
//         status: true,
//         access_token,
//         user: {
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           root: user.root
//         },
//       });
//     } catch (err) {
//       return res.status(500).send({ err: err });
//     }
//   };
