import React from "react"
import { FaShoppingCart } from "react-icons/fa";

const CartWidget = () => {
    return (
        <>
        <div className="user_info">
        <FaShoppingCart><div className=""><p className="prod_counter"> </p></div></FaShoppingCart>
        </div>
        </>
        )
}

export default CartWidget