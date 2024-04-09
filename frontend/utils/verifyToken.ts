import Cookies from 'js-cookie'
import axios from 'axios'

const verifyToken = async () => {
    try {
        const cookieValue = Cookies.get('access_token');
        console.log(cookieValue);
        const verifyUser = await axios.post('http://localhost:4040/api/verifyToken', {}, {
            headers: {
                Authorization: cookieValue 
            }
        })

        const data = verifyUser.data 
        console.log(data)
        return data

    } catch (error) {
        console.log(error)
    }
}

export default verifyToken