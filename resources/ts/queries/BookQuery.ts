import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/BookAPI";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const useBooks = () => {
    return useQuery(['books'], api.getBooks);
}

const useCreateBook = () => {
    const queryClient = useQueryClient()

    return useMutation(api.createBook, {
        onSuccess: () => {
            queryClient.invalidateQueries(['books'])
            toast.success('新規作成に成功しました。')
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
                toast.error('新規作成に失敗しました。')
            }
        }
    })
}

const useUpdateBook = () => {
    const queryClient = useQueryClient()

    return useMutation(api.updateBook, {
        onSuccess: () => {
            queryClient.invalidateQueries(['books'])
            toast.success('更新に成功しました。')
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
                toast.error('更新に失敗しました。')
            }
        }
    })
}

const useDeleteBook = () => {
    const queryClient = useQueryClient()

    return useMutation(api.deleteBook, {
        onSuccess: () => {
            queryClient.invalidateQueries(['books'])
            toast.success('削除に成功しました。')
        },
        onError: (error: AxiosError) => {
            toast.error('削除に失敗しました。')
        }
    })
}

export {
    useBooks,
    useCreateBook,
    useUpdateBook,
    useDeleteBook 
}