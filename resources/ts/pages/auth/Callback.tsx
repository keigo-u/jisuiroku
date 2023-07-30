import { useLocation, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { useEffect, useMemo } from "react"
import { useSocialLogin } from "../../queries/AuthQuery"
import queryString from 'query-string'
import React from "react"

export const CallbackPage = () => {
    const { provider } = useParams()
    const location  = useLocation()
    const socialResponse = useMemo(
        () => queryString.parse(location.search) ?? {}, [location.search]
    )

    const socialLgin = useSocialLogin()
    useEffect(() => {
        if(provider) {
            socialLgin.mutate({ provider, authParams: socialResponse })
        }
    }, [])

    return (
        <>
        <div className="w-full text-2xl text-center">ソーシャルログイン処理中</div>
        </>
    )
}