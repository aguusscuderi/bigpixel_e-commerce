import { useState } from "react"
import { postData } from '../../utils/fetchData'
import  getGoogleOAuthURL  from '../../utils/getGoogleUrl'
import { setCookie } from "nookies"
import { actionCreators, State } from '../../global/store'
import {useDispatch, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';

const Form = () => {
    const authStatus = useSelector((state: State) => state.auth)
    const dispatch = useDispatch()
    const { auth } = bindActionCreators(actionCreators, dispatch)

    const [datosLogin, setDatosLogin] = useState({
        email: '',
        password: ''
    })

    const handleLoginChange = (e: { target: { name: any; value: string } }) => {
        const {name, value} = e.target
        setDatosLogin({...datosLogin, [name]:value})
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const myData = await postData('login', datosLogin)
        console.log(myData)

        setCookie(null, "refresh_token", myData.refresh_token, {
            maxAge: 259200,
            //path: 'http://localhost:4040/'
        })
        setCookie(null, "access_token", myData.access_token, {
            maxAge: 259200,
            //path: 'api/auth/accessToken'
        })

        auth(true, myData.access_token, myData.user)

        // router.push('/')
        console.log(myData, 'BACKEND RESPONSE.')
    }

    return (
        <>
        <div className="signin_form-container">
            <h2 className="signin_h2"> Sigin in! </h2>
            <div className="signin-inputs">
                <input onChange={handleLoginChange} type="text" name="email" placeholder="email" required/>
                <input onChange={handleLoginChange} type="password" name="password" placeholder="email" required/>
                <a href="/password-recovery"> <p> Forgot your password? </p> </a>
                <button className="login-button" onClick={handleSubmit}> LOGIN. </button>
            </div>
            <div className="signing-form_footer">
                <div>
                    <p> Or connect with: <a href={getGoogleOAuthURL()}>Google</a> </p>
                </div>
                <div>
                    <p> New to shop? </p>
                    <b> JOIN NOW! </b>
                </div>
            </div>
        </div>
        </>
    )
}

export default Form