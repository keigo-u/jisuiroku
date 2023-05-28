import axios from "axios";
import { User } from "../types/Book";

const getUser = async () => {
    const { data } = await axios.get<User>("/api/user");
    return data;
}

const register = async ({ name, email, password, password_confirmation }: { name: string, email: string, password: string, password_confirmation: string}) => {
    const { data } = await axios.post<User>('api/register', { name, email, password, password_confirmation })
    return data
}

const login = async ({ email, password }: { email: string, password: string }) => {
    const { data } = await axios.post<User>('api/login', { email, password })
    return data
}

const logout = async () => {
    const { data } = await axios.post<User>('api/logout')
    return data
}

export {
    getUser,
    register,
    login,
    logout,
}