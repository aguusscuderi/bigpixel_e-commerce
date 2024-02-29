// import  React  from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from 'react-redux'
import { store, persist } from '../global/store/index'
import {PersistGate} from 'redux-persist/integration/react'
import Index from '../pages/index'
import Signin from '../pages/signin'
import ProductsView from '../pages/products'

function App() {
  return (
    <>
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index></Index>}></Route>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            <Route path="/productos" element={<ProductsView></ProductsView>}></Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    </>
  )
}

export default App
