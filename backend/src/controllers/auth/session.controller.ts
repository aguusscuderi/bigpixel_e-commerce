import {  getGoogleUser, getGoogleOAuthTokens } from "../../service/user.service"
import { Request, Response } from "express"

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
            console.log(googleUser)
            return res.status(200).send("Google account verified.")
        }

        /*const updateUser: UpdateUserOptions = {
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
        } 

        const user = findAndUpdateUser(
            {
                email: googleUser.email
            }, {
                updateUser
            }, {
                upsert: true,
                new: true
            } 
        )
         */

        // CREATE SESSION

        // CREACE ACCESs & REFRESH TOKENS

        // SET COOKIES

        // REDIRECT TO THE CLIENT

    } catch (error:any) {
        console.log('ERROR DESDE SESSION.CONTROLLER', error)
    }

}