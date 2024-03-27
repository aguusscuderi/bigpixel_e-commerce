import axios from 'axios'
import qs from 'qs'
import Users from '../../models/user'
import bcrypt from "bcrypt";

// DIRECT:

export async function isValidPswd(user: { password: string; }, pswd: string){
    return await bcrypt.compare(pswd, user.password)
  }
  

// GOOGLE:

interface GoogleTokensResult {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    id_token: string
}

interface GoogleUser {
    id: string
    email: string
    verified_email: boolean
    name: string
    given_name: string
    family_name: string
    picture: string
    locale: string
}

export async function getGoogleOAuthTokens ({code}:{code: string}): Promise<GoogleTokensResult> {
    console.log('Executing GoogleAuthTokens')

    const url = "https://oauth2.googleapis.com/token"
    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT,
        grant_type: "authorization_code"
    }
    
    try{
        const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values), {
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        return res.data
    }catch(error: any){
        console.log('ERROR DESDE USER.SERVICE', error.response)
        throw new Error(error.message)
    }

}

export async function getGoogleUser ({ id_token, access_token }: { id_token: string, access_token: string }): Promise<GoogleUser> {
    try {
        const res = await axios.get<GoogleUser>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers:{
                authorization: `Bearer ${id_token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.log(error, 'Error en GoogleGetUser.')
        throw new Error(error.message)
    }
}

export async function findAndUpdateUser (
    query: {email: string},
    update: { id: number, email: string, name: string, verified: boolean, source: string },
) {
    console.log(update.id)
    const findUser = await Users.findOne({ where: { email: query.email } })
    if(findUser !== null) {
        return await Users.update({ update }, {
            where: {
              email: findUser.email,
            },
          });
    }else {
        return await Users.create({
            ...update,
            password: ""
        })
    }
}