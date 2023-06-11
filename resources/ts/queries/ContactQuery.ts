import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from './../api/ContactAPI'
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const useContact = () => {
    const queryClient = useQueryClient()

    return useMutation(api.postContact, {
        onSuccess: () => {
            queryClient.invalidateQueries(['contacts'])
            toast.success('お問い合わせの送信に成功しました。')
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
                toast.error('お問い合わせの送信に失敗しました。')
            }
        }
    })
}

export {
    useContact
}