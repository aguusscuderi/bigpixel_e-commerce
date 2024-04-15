import { ActionTypes } from "../../global/types"
import { AuthAction } from "../../global/actions/authActions";

const initialState = {
    status: false,
    user: {
          name: '',
          email: '',
          role: '',
          avatar: '',
          root: false
        
    },
    token: ''
}

export function authReducer (state = initialState, action: AuthAction) {
    switch (action.type){
        case ActionTypes.AUTH: {
            return {
                ...state,
               status: action.payload.status,
               user: action.payload.user,
               token: action.payload.token
            }
        }

        default: return state
    }
}