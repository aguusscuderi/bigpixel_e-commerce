import { Request, Response } from "express";
import Users from "../../models/user";
import { authByParams } from "../../middleware/verifyAccessToken"
import { ParamsDictionary } from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";


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