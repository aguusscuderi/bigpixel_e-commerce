import {combineReducers} from 'redux'
import { shoppingCartReducer } from './shoppingCartReducer'
import { filtersReducer } from './filtersReducer'
import { authReducer } from './authReducer'
const reducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    filter: filtersReducer,
    auth: authReducer
})

export default reducer
export type State = ReturnType<typeof reducer>