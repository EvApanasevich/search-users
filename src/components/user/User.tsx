import React, {useState} from "react"
import {removeUser, UserType} from "../../redux/users-reducer";
import "./User.css"
import {useDispatch} from "react-redux";
import {Modal} from "../modal/Modal";

type PropsType = {
    user: UserType
    arrSearchName?: Array<Array<number>>
    arrSearchUsername?: Array<Array<number>>
    arrSearchEmail?: Array<Array<number>>
    setInputText?: (text: string) => void
    setSearchUsers?: (users: Array<{}>) => void
}

export const User: React.FC<PropsType> = (props) => {
    const {user, arrSearchName, arrSearchUsername, arrSearchEmail, setInputText, setSearchUsers} = props

    const [modalActive, setModalActive] = useState<boolean>(false)

    const dispatch = useDispatch()

    const remove = () => {
        dispatch(removeUser(user.id))
        if (setInputText !== undefined)
            setInputText('')
        if (setSearchUsers !== undefined)
            setSearchUsers([])
    }

    let name = user.name
    let startName: string = ''
    let searchNameSymbols: string = ''
    let endName: string = ''

    if (arrSearchName) {
        startName = name.slice(0, arrSearchName[0][0])
        searchNameSymbols = name.slice(arrSearchName[0][0], arrSearchName[0][0] + arrSearchName[0][1])
        endName = name.slice(arrSearchName[0][0] + arrSearchName[0][1])
    }

    let username = user.username
    let startUsername: string = ''
    let searchUsernameSymbols: string = ''
    let endUsername: string = ''

    if (arrSearchUsername) {
        startUsername = username.slice(0, arrSearchUsername[0][0])
        searchUsernameSymbols = username.slice(arrSearchUsername[0][0], arrSearchUsername[0][0] + arrSearchUsername[0][1])
        endUsername = username.slice(arrSearchUsername[0][0] + arrSearchUsername[0][1])
    }

    let userEmail = user.email
    let startEmail: string = ''
    let searchEmailSymbols: string = ''
    let endEmail: string = ''

    if (arrSearchEmail) {
        startEmail = userEmail.slice(0, arrSearchEmail[0][0])
        searchEmailSymbols = userEmail.slice(arrSearchEmail[0][0], arrSearchEmail[0][0] + arrSearchEmail[0][1])
        endEmail = userEmail.slice(arrSearchEmail[0][0] + arrSearchEmail[0][1])
    }

    return (
        <div className="user">
            <div onClick={() => setModalActive(true)}>
                {arrSearchName !== undefined ?
                    <div>
                        <span>name: </span>
                        {`${startName}`}<label>{`${searchNameSymbols}`}</label>{`${endName}`}
                    </div>
                    : <div>
                        <span>name: </span>{user.name}
                    </div>
                }
                {arrSearchUsername !== undefined ?
                    <div>
                        <span>username: </span>
                        {`${startUsername}`}<label>{`${searchUsernameSymbols}`}</label>{`${endUsername}`}
                    </div>
                    : <div>
                        <span>username: </span>{user.username}
                    </div>
                }
                {arrSearchEmail !== undefined ?
                    <div>
                        <span>email: </span>
                        {`${startEmail}`}<label>{`${searchEmailSymbols}`}</label>{`${endEmail}`}
                    </div>
                    : <div>
                        <span>email: </span>{user.email}
                    </div>
                }
            </div>
            <button onClick={remove}>delete</button>
            <Modal active={modalActive} setActive={setModalActive} address={user.address} company={user.company}/>
        </div>
    )
}
