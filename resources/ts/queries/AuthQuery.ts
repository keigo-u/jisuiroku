import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "../api/AuthAPI";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/AuthContext";

const useUser = () => {
    return useQuery(['user'], api.getUser);
}

const useLogin = () => {
    const { setIsAuth } = useAuth()
    return useMutation(api.login, {
        onSuccess: (user) => {
            if (user) {
                setIsAuth(true)
            }
        },
        onError: (error: AxiosError) => {
            toast.error('ログインに失敗しました。')
        }
    })
}

const useLogout = () => {
    const { setIsAuth } = useAuth()
    return useMutation(api.logout, {
        onSuccess: (user) => {
            if (user) {
                setIsAuth(false)
            }
        },
        onError: (error: AxiosError) => {
            toast.error('ログアウトに失敗しました。')
        }
    })
}

export {
    useUser,
    useLogin,
    useLogout,
}