import React from 'react'
import { useState } from 'react'

export default function CartForm () {
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        telefono: '',
        direccion: ''
    })


    const handleChange = (e: any) => {
        e.preventDefault()
        const {name, value} = e.target
        setDatos({ ...datos, [name]: value})
    }


    return(
        <>
    <div className="buying-form-div">
        <h2> Completa tus datos y finaliza tu compra! </h2>
        <form className="buying-form" action="" /*onSubmit={props.handleSubmit}*/>
                <div className="name-input">
                    <label htmlFor="name"> Nombre: </label>
                    <input placeholder="Ingresa tu nombre" type="text" id="name" name="nombre" required pattern="^[a-zA-Z]+(?:\s?[a-zA-z]+)+" onChange={handleChange}/>
                    {/* <p style={{'font-size': '12px'}}>Su NOMBRE solo debe contener caracteres.</p> */}
                </div>

                <div className="surname-input">
                    <label htmlFor="surname"> Apellido: </label>
                    <input placeholder="Ingresa tu apellido" type="text" id="surname" name="apellido" required pattern="^[a-zA-Z]+(?:\s?[a-zA-z]+)+" onChange={handleChange}/>
                    {/* <p style={{'font-size': '12px'}}>Su APELLIDO solo debe contener caracteres.</p> */}
                </div>

                <div className="dni-input">
                    <label htmlFor="dni"> DNI: </label>
                    <input placeholder="DNI" type="number" id="dni" name="dni" required onChange={handleChange}/>
                </div>

                <div className="email-input">
                    <label htmlFor="email"> Email: </label>
                    <input  placeholder="example@email.com" type="email" id="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={handleChange}/>
                </div>

                <div className="phoneNumber-input">
                    <label htmlFor="number"> Telefono: </label>
                    <input placeholder="Telefono" type="number" id="number" name="telefono" required onChange={handleChange}/>
                </div>

                <div className="address-input">
                    <label htmlFor="text"> Direccion: </label>
                    <input placeholder="Direccion" type="text" id="text" name="direccion" required onChange={handleChange}/>
                </div>

                <button type="submit"> Finalizar compra </button>
        </form>
    </div>  
        </> 
    )
}