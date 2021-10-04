import React from "react"
import {UserType} from "../redux/users-reducer";

type PropsType = {
    user: UserType
}

export const User: React.FC<PropsType> = (props) => {
    const {user} = props

    return (
        <div>
            <div>
                {user.name}
            </div>
            <div>
                {user.username}
            </div>
            <div>
                {user.email}
            </div>
            <button>delete</button>
        </div>
    )
}