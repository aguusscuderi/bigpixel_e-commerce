import { getGoogleOAuthTokens } from "../../service/user.service"
import { Request, Response } from "express"

export async function googleOAuthHandler (req: Request, res: Response){
    try {

        console.log('Executing GoogleAuthHandler')
        // GET THE CODE FROM QS

        const code = req.query.code as string
        const { id_token, access_token } = await getGoogleOAuthTokens({ code })
        console.log({ id_token, access_token })

        // GET THE ID AND ACCESS TOKEN W THE CODE
        // GET USER W TOKENS
        // UPSERT THE USER
        //CREATE SESSION
        // CREACE ACCES & REFRESH TOKENS
        // SET COOKIES
        // REDIRECT TO THE CLIENT
    } catch (error:any) {
        console.log('ERROR DESDE SESSION.CONTROLLER', error)
    }

}