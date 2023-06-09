import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/RecordAPI"
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const useRecords = (id: number) => {
    return useQuery(['records'], () => api.getRecords(id));
}

const useCreateRecord = () => {
    const queryClient = useQueryClient()

    return useMutation(api.createRecord, {
        onSuccess: () => {
            queryClient.invalidateQueries(['record'])
            toast.success('記録に成功しました。')
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
                toast.error('記録に失敗しました。')
            }
        }
    })
}

export {
    useRecords,
    useCreateRecord
}