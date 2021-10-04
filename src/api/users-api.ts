import axios from "axios";
import {UserType} from "../redux/users-reducer";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true,
})

export const usersApi = {
    getUsers() {
        return instance.get<Array<UserType>>('users')
    }
}
