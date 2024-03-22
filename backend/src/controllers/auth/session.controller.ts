import {  getGoogleUser, getGoogleOAuthTokens/*, findAndUpdateUser*/ } from "../../service/user.service"
import { Request, Response } from "express"



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
        } else {
            return res.status(200).send("Google account verified.")
        }

        // const user = await findAndUpdateUser({
        //     email: googleUser.email
        // }, {
        //     email: googleUser.email,
        //     name: googleUser.name,
        //     verified: true,
        //     source: 'google'
        // })

    
         

        // CREATE SESSION

        // CREACE ACCESs & REFRESH TOKENS

        // SET COOKIES

        // REDIRECT TO THE CLIENT

    } catch (error:any) {
        console.log('ERROR DESDE SESSION.CONTROLLER', error)
    }

}