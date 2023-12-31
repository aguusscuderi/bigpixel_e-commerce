import axios from 'axios'
import qs from 'qs'

interface GoogleTokensResult {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    id_token: string
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