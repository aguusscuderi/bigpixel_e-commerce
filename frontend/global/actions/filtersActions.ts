import { ActionTypes } from '../../global/types/index'

interface FilterBySearching {
    type: ActionTypes.SEARCHINGFILTER,
    payload: ({ searching: string })
}

interface FilterByCategory {
    type: ActionTypes.CATEGORY_FILTER,
    payload: ({ category: string })
}


export type ActionFilter = FilterBySearching | FilterByCategory