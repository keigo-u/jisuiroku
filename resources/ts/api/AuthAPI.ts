import axios from "axios";
import { User } from "../types/Book";

const getUser = async () => {
    const { data } = await axios.get<User>("/api/user");
    return data;
}

const updateUser = async ({ name, email }: { name: string, email: string }) => {
    const { data } = await axios.patch<User>('/api/user', { name, email })
    return data
}

const updateUserIcon = async (input) => {
    const url = '/api/user/icon' + '?_method=PATCH'
    const { data } = await axios.post(url, input)
    return data
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

const getOAuthUrl = async ({ provider }: { provider: string}) => {
    const { data } = await axios.get(`/api/login/${provider}`)
    return data
}

const socialLogin = async ({ provider, authParams }: { provider: string, authParams }) => {
    const { data } = await axios.post(`/api/login/${provider}/callback`, authParams)
    return data
}

export {
    getUser,
    updateUser,
    updateUserIcon,
    register,
    login,
    logout,
    getOAuthUrl,
    socialLogin
}