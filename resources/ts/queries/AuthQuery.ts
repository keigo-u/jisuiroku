import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/AuthAPI";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/AuthContext";

const useUser = () => {
    return useQuery(['user'], api.getUser);
}

const useUpdateUser = () => {
    const queryClient = useQueryClient()
    return useMutation(api.updateUser, {
        onSuccess: () => {
            toast.success('更新に成功しました。')
        },
        onError: () => {
            toast.error('更新に失敗しました。')
        }
    })
}

const useRegister = () => {
    const { setIsAuth } = useAuth()
    return useMutation(api.register, {
        onSuccess: (user) => {
            if (user) {
                setIsAuth(true)
            }
        },
        onError: (error: AxiosError) => {
            if (error.response?.data.errors) {
                Object.values(error.response?.data.errors).map(
                    (messages: string[]) => {
                        messages.map((message: string) => {
                            toast.error(message)
                        })
                    }
                )
            } else {
                toast.error('アカウント作成に失敗しました。')
            }
        }
    })
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
    useUpdateUser,
    useRegister,
    useLogin,
    useLogout,
}