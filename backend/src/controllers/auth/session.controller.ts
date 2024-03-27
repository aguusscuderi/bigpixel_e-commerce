// GOOGLE OAUTH AND DIRECT AUTHORIZATION SERVICES:

import {  getGoogleUser, getGoogleOAuthTokens, findAndUpdateUser, isValidPswd } from "../../service/auth/user.service"
import { Request, Response } from "express"
import Users from "../../models/user";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../../service/auth/generateToken.service";
import { sendEmail, getTemplate } from '../../service/auth/emailVerify.service'


// DIRECT:

export const directLogin = async (req: { body: { email: string; password: string; }; }, res: Response<any, Record<string, any>>) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: {email: email} });
    if (!user) return res.status(400).json({ err: "This user does not exist." });

    const isMatch = await isValidPswd(user.dataValues, password)
    if (!isMatch) return res.status(400).json({ err: "Incorrect password." });

    const access_token = createAccessToken({ id: user.dataValues.id.toString() });
    const refresh_token = createRefreshToken({ id: user.dataValues.id.toString() });

    // MEJOR CREAR LAS COOKIES DESDE EL BACKEND, Y NO DEL FRONT!

    // res.cookie("access_token", access_token, {
    //   maxAge: 900000, // 15 min
    //   httpOnly: true,
    //   domain: 'localhost',
    //   path: '/',
    //   sameSite: 'strict',
    //   secure: false
    // })

    // res.cookie("refresh_token", refresh_token, {
    //   maxAge: 1000*60*60*24*15, // 15 days
    //   httpOnly: true,
    //   domain: 'localhost',
    //   path: '/',
    //   sameSite: 'strict',
    //   secure: false
    // })


    res.json({
      msg: "Login Success!",
      refresh_token,
      access_token,
      user: {
        name: user.dataValues.name,
        email: user.dataValues.email,
        role: user.dataValues.role,
        root: user.dataValues.root,
      },
    });
  } catch (err) {
    return res.status(500).json({error: err});
  }
};


export const directRegister = async (req: { body: { name: string; email: string; password: string; }; }, res: Response<any, Record<string, any>>) => {
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
        
        // GET USER W TOKENS
        const googleUser = await getGoogleUser({ id_token, access_token })

        // UPSERT THE USER
        if (!googleUser.verified_email) {
            return res.status(403).send("Google account not verified.")
        } 

        const googleUserId = +googleUser.id.toString().slice(0,-2) //Tuve que recortar el ID porque postgress no permite un numero tan grande.
        const user = await findAndUpdateUser({
            email: googleUser.email
        }, {
            id: googleUserId, 
            email: googleUser.email,
            name: googleUser.name,
            verified: true,
            source: 'google'
        })

        // CREATE SESSION

        // CREATE ACCESS & REFRESH TOKENS

        const jwt_access_token = createAccessToken({ id: googleUserId.toString() });
        const jwt_refresh_token = createRefreshToken({ id: googleUserId.toString() }); 

        // SET COOKIES

        res.cookie("access_token", jwt_access_token, {
          maxAge: 900000, // 15 min
          httpOnly: true,
          domain: 'localhost',
          path: '/',
          sameSite: 'strict',
          secure: false
        })

        res.cookie("refresh_token", jwt_refresh_token, {
          maxAge: 1000*60*60*24*15, // 15 days
          httpOnly: true,
          domain: 'localhost',
          path: '/',
          sameSite: 'strict',
          secure: false
        })

        // REDIRECT TO THE CLIENT

        res.redirect('http://localhost:5173/')

    } catch (error:any) {
        console.log('ERROR DESDE SESSION.CONTROLLER', error)
    }

}