import { ActionTypes } from "../../global/types"
import { ActionFilter } from "../../global/actions/filtersActions";

const initialState = {
    page: '',
    category: '',
    sort: '',
    search: ''
}

export function filtersReducer (state = initialState, action: ActionFilter) {
    switch (action.type){
        case ActionTypes.SEARCHINGFILTER: {
            console.log(action.payload.searching, 'on changing search')
            return {
                ...state,
                search: action.payload.searching
            }
        }

        case ActionTypes.CATEGORY_FILTER: {
            console.log(action.payload.category, 'on changing category')
            return {
                ...state,
                category: action.payload.category
            }
        }

        default: return state
    }
}