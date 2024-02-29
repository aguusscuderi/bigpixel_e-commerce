import  '../../styles/cards/card.module.css'
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
// import { useShoppingCart } from '../contexts/cartContext'
// import React from 'react';
// import {useDispatch, useSelector} from 'react-redux'
// import { bindActionCreators } from 'redux';
// import { actionCreators, State } from '../global/store'

type CardProps = {
    id: number;
    title: string;
    imageSource: string;
    text: string;
    price: number;
};

const Card = (props: CardProps) => {
    // const dispatch = useDispatch()
    // const { addToCart } = bindActionCreators(actionCreators, dispatch)

    const [count, setCount] = useState(1)
    const [price, setPrice] = useState(props.price)
    
    function increase() {
        setCount(count + 1)
        setPrice(price + props.price)
    }
    function decrease() {
        if(count != 1) {
            setCount(count - 1)
            setPrice(price - props.price)
        }
    }

    // function clearCard() {
    //     alert('Producto agregado con éxito')
    //     setCount(1)
    //     setPrice(props.price)
    // }
    
    return(
        <div className='card'>
            <div className='cardImages'>
            {/* <Image onClick={() => router.push(`/products/${props.id}`) } src={props.imageSource} alt='name' width={200} height={200}/> */}
            </div>
            <h4 className='title'>{props.title}</h4>
            <h6 className='subtitle'>{props.text}</h6>
            <h3 className='price'>${price}</h3>
            <div className='buttonSection'>
                <div className='quantitySelection'>
                    <button className='btnQuantity' onClick={decrease}><AiOutlineMinus /></button>
                    <b>{count}</b>
                    <button className='btnQuantity' onClick={increase}><AiOutlinePlus/></button>
                </div>
                <button className = 'btnBuy' /*onClick={() => {addToCart(props, count, props.id), clearCard()}}*/>Agregar al carrito</button>
            </div>
        </div>
    )
}

export default Card