import {usersApi} from "../api/users-api"
import {AppThunkType} from "./redux-store";

const SET_USERS = 'USERS/SET_USERS'
const REMOVE_USER = 'USERS/REMOVE_USER'

export type UsersActionType = SetUsers | removeUsers
type SetUsers = ReturnType<typeof setUsers>
type removeUsers = ReturnType<typeof removeUser>

type UsersType = {
    users: Array<UserType>
}
export type UserType = {
    id: number
    name: string
    username: string
    email: string
    address: AddressType
    phone: string
    website: string
    company: CompanyType
}
export type AddressType = {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: GeoType
}
export type GeoType = {
    lat: string
    lng: string
}
export type CompanyType = {
    name: string
    catchPhrase: string
    bs: string
}

const initialState = {
    users: []
}

export const usersReducer = (state: UsersType = initialState, action: UsersActionType): UsersType => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                ...action.payload,
            }
        case REMOVE_USER:
            return {
                ...state,
                users: [...state.users].filter((user) => user.id !== action.payload.userId)
            }
        default:
            return state
    }
}


// action creators
export const setUsers = (users: Array<UserType>) => {
    return {type: SET_USERS, payload: {users}} as const
}
export const removeUser = (userId: number) => {
    return {type: REMOVE_USER, payload: {userId}} as const
}
//THUNK
export const getUsers = (): AppThunkType => async dispatch => {
    const res = await usersApi.getUsers()
    const users = res.data
    dispatch(setUsers(users))
}
