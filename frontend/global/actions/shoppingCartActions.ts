import { ActionTypes } from '../../global/types/index'

type CartItem = {
    id: number;
    title: string;
    imageSource: string;
    text: string;
    price: number;
    quantityToBuy: number
}

type ParsedCookie = {
    [key: string]: string;
}


interface AddToCart {
    type: ActionTypes.ADDTOCART,
    payload: ({item: Omit<CartItem, 'quantityToBuy' | '...'> , count: number, id: number})
}

interface RemoveFromCart {
    type: ActionTypes.REMOVEFROMCART,
    payload: ({ id: number })
}

interface ClearCart { 
    type: ActionTypes.CLEARCART
}

interface GetParsedCookie {
    type: ActionTypes.GETPARSEDCOOKIE
    payload: ({cookie: ParsedCookie})
}

export type Action = AddToCart | RemoveFromCart | ClearCart | GetParsedCookie

//export const addToCart = (item: Omit<CartItem, 'quantityToBuy' | '...'> , count: number, id: string) => ({type: add_to_cart, payload: {item, count, id}})