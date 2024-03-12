import { Request, Response } from "express";
import Users from "../models/user";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/auth/generateToken";
// import { authByParams } from '../middleware/verifyAccessToken'
import { sendEmail, getTemplate } from '../utils/auth/emailVerify.util'
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export const register = async (req: { body: { name: string; email: string; password: string; }; }, res: Response<any, Record<string, any>>) => {
    try {
      const { name, email, password } = req.body;
  
      // const errMsg = valid(name, email, password, cf_password);
      // if (errMsg) return res.status(400).json({ err: errMsg });
  
      const user = await Users.findOne({ where: {email: email} });
      if (user) {
        console.log('El usuario ya existe.')
        return res.status(400).json({ err: "This email already exists." });
      }

      const passwordHash = await bcrypt.hash(password, 10);
  
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });
  
      await newUser.save();

      const getNewUser = await Users.findOne({ where: { email: newUser.email } })
      
      if (getNewUser !== null) {
        const newUserID = {
          id: getNewUser.id.toString()
        }
        const token = createAccessToken(newUserID)
        const template = getTemplate(newUser, token)
        await sendEmail(email, 'Este es un email de prueba', template)
      } else {
        console.log('User not found.');
      }

      res.json({ msg: "Register Success!" });
      
    } catch (err) {
      return res.status(500).json({ err: err });
    }
  };


// export async function verifyAccount (req: Request<ParamsDictionary>, res: Response) {
//   try {
//     const { token } = req.params
//     const getUserByToken = authByParams(token)

//     if (!getUserByToken) 
//       return res.json({success: false, msg: "Data error."})

//     const { email, code } = getUserByToken.data 

//     const user = await Users.findOne({ where: { email: email } }) || null
//     if (user == null) 
//       return res.json({ success: false, msg: "User not found."})

//     if (code !== user.code) 
//       return res.json({ success: false, msg: "Invalid code."}) // Aca podria hacer un redirect a una vista de error.

//     await user.update({ verified: true })
//     await user.save()
    
//   } catch (error) {
//     console.log(error)
//   }
// }
  