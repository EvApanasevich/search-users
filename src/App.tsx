import React, {useEffect, useState} from "react";
import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, UserType} from "./redux/users-reducer";
import {AppRootStateType} from "./redux/redux-store";
import {User} from "./components/user/User";
import {Search} from "./components/search/Search";

export const App: React.FC = () => {

    const dispatch = useDispatch()
    const users = useSelector<AppRootStateType, Array<UserType>>((state) => state.users.users)
    const [searchUsers, setSearchUsers] = useState<Array<{}>>([])
    const [inputText, setInputText] = useState<string | number | readonly string[] | undefined>(undefined)
    const [notFound, setNotFound] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const reset = () => {
        dispatch(getUsers())
        setSearchUsers([])
        setInputText('')
    }

    return (
        <div className="app">
            <div className="searchBlock">
                <button children={'reset'} onClick={reset}/>
                <Search users={users}
                        setSearchUsers={setSearchUsers}
                        setNotFound={setNotFound}
                        inputText={inputText}
                        setInputText={setInputText}
                />
            </div>
            {!notFound ?
                <div className="usersBlock">
                    {searchUsers.length === 0 ?
                        users.map((user) => {
                            return <User user={user}/>
                        })
                        : searchUsers.map((user) => {
                            return user
                        })
                    }
                </div>
                : <div className="not_found">Users not found</div>
            }
        </div>
    );
}

