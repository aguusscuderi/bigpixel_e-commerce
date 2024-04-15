import Cookies from 'js-cookie'
import axios from 'axios'
import {  State } from '../global/store'
import { AnyAction, Dispatch, bindActionCreators } from "redux";
import { actionCreators } from "../global/store/";
import {useDispatch, useSelector} from 'react-redux'

const verifyToken = async (dispatch: Dispatch<AnyAction>) => {
    // const dispatch = useDispatch()
    const { auth } = bindActionCreators(actionCreators, dispatch)

    try {
        const cookieValue = Cookies.get('access_token');
        // console.log(cookieValue);
        const verifyUser = await axios.post('http://localhost:4040/api/verifyToken', {}, {
            headers: {
                Authorization: cookieValue 
            }
        })

        const data = verifyUser.data 

        console.log(data, 'Data desde el verifyJwt')

        return auth(data.status, data.token, data.user )
        // return data

    } catch (error) {
        console.log(error)
    }
}

export default verifyToken