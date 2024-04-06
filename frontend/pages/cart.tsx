import '../styles/gridSystem/gridSystem.css'
import '../styles/cards/cartProducts.css'

import {  State } from '../global/store'
import { bindActionCreators } from "redux";
import { actionCreators } from "../global/store/";
import {useDispatch, useSelector} from 'react-redux'
import { FaTrash } from "react-icons/fa";
import Card from "../components/Products/Card";

const Cart = () => {
    const dispatch = useDispatch()
    const { removeFromCart, clearCart} = bindActionCreators(actionCreators, dispatch)
    const cart = useSelector((state: State) => state.shoppingCart.cart)
    const cartPrice = cart.length >= 1 ? cart.reduce((final, item) => {return (final + (item.price * item.quantityToBuy ))}, 0) : ''

    return (
        <>   
        <div className="row">
            <div style={{'textAlign': "center"}} className="in-sm-12 in-md-8 in-lg-8 cart-center-div">
                {cart.length<=0 ? <h1>Tu carrito esta vacio, <a href="/products"> hace tu compra! </a></h1> : ''}

                <h2> Subtotal: {cartPrice} </h2> 

                {cart.length>=1 ? <button className="but_clearCart" onClick={() => {clearCart()}}> Limpiar el carrito </button> : ''}

                {cart.length<=0 ? <img style={{'maxWidth': '100%'}} alt="empty cart" /> : ''}

                {cart.length >= 1 ? cart.map((item, index) => (
                <>
                    <div key={index} className="productInCart-container">
                        <div>
                            <h1>{item.title}</h1>
                            <span> Cantidad: {item.quantityToBuy}</span>
                            <p> {item.description} </p>
                            <p> Precio: {item.price} x1 </p>
                        </div>
                
                        <div className="cartImage-container">
                            <img src={item.imageSource} alt="" />
                        </div>
                                    
                        <FaTrash style={{cursor: "pointer"}} onClick={() => removeFromCart(item.id)} className="far fa-trash-alt"/> 
                    </div>
                </>
            )) : ''}
            </div>
            {/* <div className="in-sm-12 in-md-4 in-lg-4">
               <CartFormLog finalPrice={cartPrice}/>
            </div> */}
        </div>
        </>
    )
}

export default Cart