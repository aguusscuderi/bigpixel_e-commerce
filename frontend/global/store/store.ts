import {createStore, applyMiddleware} from 'redux'
import reducer from '../../global/reducers/index'
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'persisted-data',
    blacklist: ['auth'],
    storage
}

const persistedData = persistReducer(persistConfig, reducer)

export const store = createStore(
    persistedData,
    {},
    applyMiddleware(thunk)
)

export const persist = persistStore(store)

store.subscribe(() => console.log('redux updated'))

