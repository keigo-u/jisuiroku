import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/BookAPI";

const useBooks = () => {
    return useQuery(['books'], api.getBooks);
}

const useCreateBook = () => {
    const queryClient = useQueryClient()

    return useMutation(api.createBook, {
        onSuccess: () => {
            queryClient.invalidateQueries(['books'])
            console.log('登録に成功しました。')
        },
        onError: () => {
            console.log('登録に失敗しました。')
        }
    })
}

export {
    useBooks,
    useCreateBook    
}