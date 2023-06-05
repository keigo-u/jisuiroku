import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/FavoriteAPI";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const useGetFavorites = () => {
    return useQuery(['favorites'], api.getFavorites);
}

const useFavorites = () => {
    const queryClient = useQueryClient()

    return useMutation(api.favorite, {
        onSuccess: () => {
            queryClient.invalidateQueries(['favorites'])
            toast.success('お気に入り登録に成功しました。')
        },
        onError: (error: AxiosError) => {
            toast.error('お気に入り登録に失敗しました。')
        }
    })
}

const useUnFavorites = () => {
    const queryClient = useQueryClient()

    return useMutation(api.unFavorite, {
        onSuccess: () => {
            queryClient.invalidateQueries(['favorites'])
            toast.success('お気に入り解除に成功しました。')
        },
        onError: (error: AxiosError) => {
            toast.error('お気に入り解除に失敗しました。')
        }
    })
}

export {
    useGetFavorites,
    useFavorites,
    useUnFavorites
}