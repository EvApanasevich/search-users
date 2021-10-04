import React from "react"
import "./Search.css"
import {UserType} from "../../redux/users-reducer";
import {User} from "../user/User";

type PropsType = {
    users: Array<UserType>
    inputText: string | number | readonly string[] | undefined
    setInputText: (text: string) => void
    setSearchUsers: (searchUsers: Array<{}>) => void
    setNotFound: (notFound: boolean) => void
}

export const Search: React.FC<PropsType> = (props) => {
    const {users, setSearchUsers, setNotFound, inputText, setInputText} = props

    let arrUsers: Array<{}> = []

    const search = (value: string) => {

        users.map((user) => {
            let regexp = new RegExp(`${value}`, 'ig')
            let isName = false
            let isUsername = false
            let isEmail = false
            let arrSearchName = []
            let arrSearchUsername = []
            let arrSearchEmail = []

            let result;
            while (result = regexp.exec(user.name)) {
                arrSearchName.push([result.index, result[0].length])
                isName = true
            }
            while (result = regexp.exec(user.username)) {
                arrSearchUsername.push([result.index, result[0].length])
                isUsername = true
            }
            while (result = regexp.exec(user.email)) {
                arrSearchEmail.push([result.index, result[0].length])
                isEmail = true
            }
            if (isName || isUsername || isEmail) {
                arrUsers.push(<User user={user} arrSearchName={arrSearchName.length !== 0 ? arrSearchName : undefined}
                                    arrSearchUsername={arrSearchUsername.length !== 0 ? arrSearchUsername : undefined}
                                    arrSearchEmail={arrSearchEmail.length !== 0 ? arrSearchEmail : undefined}
                                    setInputText={setInputText}
                                    setSearchUsers={setSearchUsers}
                />)
            }
        })
        if(arrUsers.length === 0) {
            setNotFound(true)
        } else {
            setSearchUsers(arrUsers)
            setNotFound(false)
        }
    }

    return (
        <div className="search">
            <input type={'text'} placeholder={'search...'} value={inputText} onChange={(e) => {
                setInputText(e.currentTarget.value)
                if (e.currentTarget.value !== '') {
                    search(e.currentTarget.value)
                } else setSearchUsers([])
            }}/>
        </div>
    )
}
