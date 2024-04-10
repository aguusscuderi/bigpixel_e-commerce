import React from 'react'

export default function CartDetail(props) {
    return(
        <>
            <div className="productInCart-container">
                <div>
                    <h1>{props.title}</h1>
                    <span> Cantidad: {props.quantityToBuy}</span>
                    <p> {props.description} </p>
                    <p> Precio: {props.price} x1 </p>
                </div>

                <div className="cartImage-container">
                    <img src="http://mistillas.cl/wp-content/uploads/2018/04/Nike-Epic-React-Flyknit-%E2%80%9CPearl-Pink%E2%80%9D-01.jpg" alt="" />
                </div>
                
                <i style={{cursor: "pointer"}} onClick={() => {props.remove(props)}} className="far fa-trash-alt"> </i>
            </div>
          
        </>
    )
}