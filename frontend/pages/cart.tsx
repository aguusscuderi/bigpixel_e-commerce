import '../styles/gridSystem/gridSystem.css'
import '../styles/cards/cartProducts.css'
import verifyToken from '../utils/verifyToken'

import NavBar from '../components/NavBar';
import {  State } from '../global/store'
import { bindActionCreators } from "redux";
import { actionCreators } from "../global/store/";
import {useDispatch, useSelector} from 'react-redux'
import { FaTrash } from "react-icons/fa";
import { useEffect } from 'react';
import CartForm from '../components/Cart/CartForm'

const Cart = () => {

    useEffect(() => {
        console.log(auth, 'MI AUTH GLOBAL DESDE EL CARRITO')
        const verified = async () => {
            try {
                const data = await verifyToken();
                if(!data) {
                    alert('DEBES INICIAR SESION PARA PROCEDER CON TU COMPRA.')
                }
            } catch (error) {
                console.log(error);
            }
        };
        verified();
    }, [])

    const dispatch = useDispatch()
    const { removeFromCart, clearCart} = bindActionCreators(actionCreators, dispatch)
    const cart = useSelector((state: State) => state.shoppingCart.cart)
    const auth = useSelector((state: State) => state.auth)
    const cartPrice = cart.length >= 1 ? cart.reduce((final, item) => {return (final + (item.price * item.quantityToBuy ))}, 0) : ''

    return (
        <>  
        <NavBar/>
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
                {cart.length>=1 ? <button className="but_clearCart"> Finalizar compra. </button> : ''} 
            </div>
            <div className="in-sm-12 in-md-4 in-lg-4">
                <CartForm/>
            </div>
        </div>
        </>
    )
}

export default Cart