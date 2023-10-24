import { useState } from "react"
import { postData } from '../../utils/fetchData'

const Form = () => {
    const [datosLogin, setDatosLogin] = useState({
        email: '',
        password: ''
    })

    const handleLoginChange = (e: { target: { name: any; value: string } }) => {
        const {name, value} = e.target
        setDatosLogin({...datosLogin, [name]:value})
        console.log(datosLogin)
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const myData = await postData('login', datosLogin)
        console.log(myData, 'BACKEND RESPONSE.')
    }

    return (
        <>
        <div className="signin_form-container">
            <h2 className="signin_h2"> Sigin in! </h2>
            <div className="signin-inputs">
                <input onChange={handleLoginChange} type="text" name="email" placeholder="email" required/>
                <input onChange={handleLoginChange} type="password" name="password" placeholder="email" required/>
                <a href="#"> <p> Forgot your password? </p> </a>
                <button className="login-button" onClick={handleSubmit}> LOGIN. </button>
            </div>
            <div className="signing-form_footer">
                <div>
                    <p> Or connect with: Google</p>
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