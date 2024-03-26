import { Request, Response } from "express";
import Users from "../models/user";
import bcrypt from "bcrypt";
import { createAccessToken } from "../service/auth/generateToken.service";
import { authByParams } from "../middleware/verifyAccessToken"
import { sendEmail, getTemplate } from '../service/auth/emailVerify.service'
import { ParamsDictionary } from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";

export const register = async (req: { body: { name: string; email: string; password: string; }; }, res: Response<any, Record<string, any>>) => {
    try {
      const { name, email, password } = req.body;
  
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
        await sendEmail(email, 'VERIFICA TU CORREO', template)
      } else {
        console.log('User not found.');
      }

      res.json({ msg: "Register Success!" });
      
    } catch (err) {
      return res.status(500).json({ err: err });
    }
  };


export async function verifyAccount (req: Request<ParamsDictionary>, res: Response) {
  try {
    const { token } = req.params
    const getUserByToken: JwtPayload | null | void = await authByParams(token);
 
    //const getUserByToken = authByParams(token)

    console.log(getUserByToken, 'GET USER BY TOKEN')

    if (!getUserByToken) 
      return res.json({ success: false, msg: "Data error."})

    const { id } = getUserByToken

    console.log(getUserByToken.data, 'DATA USER TOKEN')

    const user = await Users.findOne({ where: { id: id } }) || null
    if (user == null) 
      return res.json({ success: false, msg: "User not found."})

    /*if (id !== user.id) 
      return res.json({ success: false, msg: "Invalid code."})*/ // Aca podria hacer un redirect a una vista de error.

    await user.update({ verified: true })
    await user.save()
    
  } catch (error) {
    console.log(error)
  }
}
  