import { ActionTypes } from '../../global/types/index'

// type User = {
//     auth: boolean,
//     user:  Record<string, unknown>
// }

interface Authorization {
    type: ActionTypes.AUTH,
    payload: ({ status: boolean, token: string, user: Record<string, unknown> })
}

export type AuthAction = Authorization