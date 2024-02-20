// import { dbConnect } from 'utils/database';
// import Users from "models/userModel";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { createAccessToken } from "utils/generateToken";
// import { NextApiRequest, NextApiResponse } from "next";

// dbConnect()

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   switch (req.method) {
//     case "GET":
//       await verifyJwt(req, res);
//       break;
//   }
// };

// interface User {
//   _id: string,
//   name: string,
//   email: string,
//   role: string,
//   avatar: string,
//   root: boolean
// }

// const verifyJwt = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const refreshToken = req.headers["x-refresh-token"]
//     if (!refreshToken) return res.status(400).send({ err: "Please login now" });

//     const decoded = jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload
//     if (!decoded)  return res.status(400).send({ err: "Your token is incorrect or has expired" });

//     const user: User | null = await Users.findById(decoded.id);
//     if (!user) return res.status(400).send({ err: "User does not exist" });

//     const access_token = createAccessToken({ id: user._id });
//     res.json({
//       status: true,
//       access_token,
//       user: {
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         avatar: user.avatar,
//         root: user.root,
//       },
//     });
//   } catch (err) {
//     return res.status(500).send({ err: err });
//   }
// };

