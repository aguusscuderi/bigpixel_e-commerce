import { useState } from "react"
import { postData } from '../../utils/fetchData'
import React from "react"

const Register = () => {
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleRegisterChange = (e: { target: { name: any; value: string } }) => {
        const {name, value} = e.target
        setRegisterData({...registerData, [name]:value})
        console.log(registerData)
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        await postData('register', registerData)
    }

    return (
        <div className="signin_form-container">
            <h2 className="signin_h2"> Register </h2>
            <div className="signin-inputs">
            <input onChange={handleRegisterChange} type="text" name="name" placeholder="Name" required/>
                <input onChange={handleRegisterChange} type="text" name="email" placeholder="Email" required/>
                <input onChange={handleRegisterChange} type="password" name="password" placeholder="Password" required/>
                <button className="login-button" onClick={handleSubmit}> REGISTER. </button>
            </div>
        </div>
    )
}

export default Register
