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
            }
        }
    })
}

export {
    useBooks,
    useCreateBook    
}