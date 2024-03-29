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
import ProductDetails from '../pages/products/index'

function App() {
  return (
    <>
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/productos" element={<ProductsView/>}></Route>
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    </>
  )
}

export default App
