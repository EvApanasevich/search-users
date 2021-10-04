import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import {ThunkAction} from "redux-thunk";
import {UsersActionType, usersReducer} from "./users-reducer";


const rootReducer = combineReducers({
    users: usersReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = UsersActionType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
// @ts-ignore
window.store = store