import {  getGoogleUser, getGoogleOAuthTokens, findAndUpdateUser } from "../../service/auth/user.service"
import { Request, Response } from "express"

import Users from "../../models/user";
import bcrypt from "bcrypt";
import { createAccessToken } from "../../service/auth/generateToken.service";

import { sendEmail, getTemplate } from '../../service/auth/emailVerify.service'


// DIRECT:

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

//////////////////////////////////////////////////
//////////////////////////////////////////////////

// GOOGLE:

export async function googleOAuthHandler (req: Request, res: Response){
    try {
        console.log('Executing GoogleAuthHandler')

        // GET THE CODE FROM QS
        const code = req.query.code as string

        // GET THE ID AND ACCESS TOKEN W THE CODE
        const { id_token, access_token } = await getGoogleOAuthTokens({ code })
        console.log({ id_token, access_token })
        
        // GET USER W TOKENS
        const googleUser = await getGoogleUser({ id_token, access_token })

        // UPSERT THE USER
        if (!googleUser.verified_email) {
            return res.status(403).send("Google account not verified.")
        } /*else {
            return res.status(200).send("Google account verified.")
        }*/

        const user = await findAndUpdateUser({
            email: googleUser.email
        }, {
            id: +googleUser.id.toString().slice(0, -2), //Tuve que recortar el ID porque postgress no permite un numero tan grande.
            email: googleUser.email,
            name: googleUser.name,
            verified: true,
            source: 'google'
        })

        // CREATE SESSION

        // CREACE ACCESs & REFRESH TOKENS

        // SET COOKIES

        // REDIRECT TO THE CLIENT

    } catch (error:any) {
        console.log('ERROR DESDE SESSION.CONTROLLER', error)
    }

}