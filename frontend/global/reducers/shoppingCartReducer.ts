import { Action } from "../../global/actions/shoppingCartActions";
import { ActionTypes } from "../../global/types";

type CartItem = {
    id: string;
    title: string;
    imageSource: string;
    text: string;
    price: number;
    quantityToBuy: number
}

//NO SE SI ESTO ESTA BIEN
// const initialState = {
//     cart: [{
//     id: null,
//     title: null,
//     imageSource: null,
//     text: null,
//     price: null,
//     quantityToBuy: 0
//     }],
//     cartCount: 0
// }

const initialState = {
    cart: [{
    id: "",
    title: "",
    imageSource: "",
    text: "",
    price: 0,
    quantityToBuy: 0
    }],
    cartCount: 0
}



/*type initialState = {
    cart: CartItem[]
    cartCount: number
}*/


export function shoppingCartReducer (state = initialState, action: Action) {
    switch (action.type){
        case ActionTypes.ADDTOCART: {
            const isInCart = (id: string) => {
                const verificator = state.cart.some(el => el.id === id)
                return verificator
            }
            return ((isInCart(action.payload.id) && action.payload.id != null)  ? {
                ...state,
                cart: state.cart.map((product) => 
                product.id === action.payload.id ? { ...product, quantityToBuy: product.quantityToBuy + action.payload.count} : {...product}
                ),
                cartCount: state.cartCount = action.payload.count + state.cartCount,
            } : {
                cart: [...state.cart, {...action.payload.item, quantityToBuy: action.payload.count}],
                cartCount: action.payload.count + state.cartCount,
            })
        }

        case ActionTypes.REMOVEFROMCART: {
            const cartWithoutDeletedElement = state.cart.filter(el => el.id !== action.payload.id)
            const cartCountWithoutElement = state.cart.find(el => el.id ===  action.payload.id)
            return {
                cart: [...cartWithoutDeletedElement],
                cartCount:( cartCountWithoutElement ? state.cartCount - cartCountWithoutElement.quantityToBuy : state.cartCount)
            }
        }
        
        case ActionTypes.GETPARSEDCOOKIE: {
                const isNotEmpty = Object.keys(action.payload.cookie).length != 0
                if(isNotEmpty) {
                    const parsedCookie = JSON.parse(action.payload.cookie.shoppingCart)
                    return {
                        cart: [...parsedCookie.cart],
                        cartCount: parsedCookie.counter
                    }
                }else{
                    return {
                        ...state
                    }
                }
        }
     
        case ActionTypes.CLEARCART:{
            return {
                cart: {...initialState.cart},
                cartCount: 0
            }
        }
           
        
        default: return state

    }
}