import { Action } from "../../global/actions/shoppingCartActions";
import { ActionTypes } from "../../global/types";

interface Product {
    id: number;
    title: string;
    imageSource: string;
    text: string;
    price: number;
    quantityToBuy: number;
}

interface ShoppingCartState {
    cart: Product[];
    cartCount: number;
}

const initialState: ShoppingCartState = {
    cart: [],
    cartCount: 0
};

export function shoppingCartReducer (state: ShoppingCartState = initialState, action: Action) {
    switch (action.type){
        case ActionTypes.ADDTOCART: {
            const isInCart = (id: number) => {
                const verificator = state.cart.length >= 1 ? state.cart.some(el => el.id === id) : '';
                return verificator;
            };
            return (isInCart(action.payload.id)) ? {
                ...state,
                cart: state.cart.map((product) =>
                    product.id === action.payload.id ? { ...product, quantityToBuy: product.quantityToBuy + action.payload.count } : { ...product }
                ),
                cartCount: state.cartCount = action.payload.count + state.cartCount,
            } : {
                ...state,
                cart: [...state.cart, { ...action.payload.item, quantityToBuy: action.payload.count }],
                cartCount: action.payload.count + state.cartCount,
            };
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
                cart: [],
                cartCount: 0
            }
        }
           
        
        default: return state

    }
}