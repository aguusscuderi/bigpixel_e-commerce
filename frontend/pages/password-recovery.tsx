import React from 'react' 
import NavBar from '../components/NavBar'

const PasswordRecovery = () => {

    return (
        <>
        <NavBar/>
        <div>
            <h1> Recupera tu contraseña </h1>
                <b> Escribe el email asociado a tu cuenta para restablecer tu contraseña. </b>
                <input type="text" />
                <button> Recuperar contraseña </button>
        </div>
        </>
    )
}

export default PasswordRecovery