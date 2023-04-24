import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/RecordAPI"
import { toast } from "react-toastify";

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
        onError: () => {
            toast.error('記録に失敗しました。')
        }
    })
}

export {
    useRecords,
    useCreateRecord
}