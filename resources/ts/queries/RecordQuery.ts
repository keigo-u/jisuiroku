import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/RecordAPI"
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const useRecords = (id: number, page: number = 1) => {
    return useQuery(['records', page], () => api.getRecords(id, page), {
        keepPreviousData: true
    });
}

const useCreateRecord = () => {
    const queryClient = useQueryClient()

    return useMutation(api.createRecord, {
        onSuccess: () => {
            queryClient.invalidateQueries(['records'])
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

const useUpdateRecord = () => {
    const queryClient = useQueryClient()

    return useMutation(api.updateRecord, {
        onSuccess: () => {
            queryClient.invalidateQueries(['records'])
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

const useDeleteRecord = () => {
    const queryClient = useQueryClient()

    return useMutation(api.deleteRecord, {
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
    useRecords,
    useCreateRecord,
    useUpdateRecord,
    useDeleteRecord
}