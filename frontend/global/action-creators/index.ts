import { ActionTypes } from "../../global/types"
import { Dispatch } from "redux"
import { Action } from "../../global/actions/shoppingCartActions"
import { ActionFilter } from '../../global/actions/filtersActions'
import { AuthAction } from '../../global/actions/authActions'

/////////////////
//SHOPPING CART//
////////////////

export const addToCart = ( 
    item: { id: number; title: string; imageSource: string; text: string; price: number},
    count: number,
    id: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.ADDTOCART,
            payload: { item, count, id }
        })
    }
}

export const getParsedCookie = (cookie: {[key: string]: string}) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.GETPARSEDCOOKIE,
            payload: { cookie }
        })
    }
}

export const removeFromCart = (id: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.REMOVEFROMCART,
            payload: { id }
        })
    }
}

export const clearCart = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.CLEARCART,
        })
    }
}
/////////////////////////////////////////////
/////////////////////////////////////////////


////////////////
///FILTERING///
//////////////

export const searchingFilter = (searching: string) => {
    return (dispatch: Dispatch<ActionFilter>) => {
        dispatch({
            type: ActionTypes.SEARCHINGFILTER,
            payload: { searching }
        })
    }
}


export const categoryFilter = (category: string) => {
    return (dispatch: Dispatch<ActionFilter>) => {
        dispatch({
            type: ActionTypes.CATEGORY_FILTER,
            payload: { category }
        })
    }
}

//////////////////////////////////////////////
/////////////////////////////////////////////

//////////
// AUTH //
/////////

export const auth = (status: boolean, token: string, user: Record<string, unknown>) => {
    return (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: ActionTypes.AUTH,
            payload: { status, token, user }
        })
    }
}

//////////////////////////////////////////////
/////////////////////////////////////////////
