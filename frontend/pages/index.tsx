import NavBar from '../components/NavBar' 
import Carrousel from '../components/Carrousel'
import { State } from '../global/reducers'
import { useDispatch } from 'react-redux'
import {useSelector} from 'react-redux'
import { useEffect } from 'react'



const Index = () => {
    const auth = useSelector((state: State) => state.auth) as { status: boolean };
    useEffect(() => {
        console.log(auth, 'AUTH DESDE EL INDEX: ')
    }, [])
    return (
        <>
        <NavBar />
        <Carrousel />
        </>
    )
        
}

export default Index