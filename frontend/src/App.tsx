// import  React  from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from '../pages/index'
import Signin from '../pages/signin'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index></Index>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
