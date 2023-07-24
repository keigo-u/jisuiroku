import React, { useState } from "react";
import { useUpdateUser, useUser } from "../../queries/AuthQuery";
import { IconEdit, IconSquareRoundedX } from "@tabler/icons-react";

export const ProfilePage = () => {

    const { isLoading, data: authUser } = useUser();
    const updateUser = useUpdateUser()
    const [isEdit, setIsEdit] = useState(false)

    if(isLoading || !authUser) {
        return (
            <div>読み込み中です。</div>
        )
    }

    const [name, setName] = useState(authUser.name)
    const [email, setEmail] = useState(authUser.email)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing || e.key !== 'Enter') return
        handleSubmit(e)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        setIsEdit(false)
        updateUser.mutate({name: name, email: email})
    }

    return (
        <>
            <div className="flex">
                <div className="text-2xl m-5 px-12 py-2 bg-brown drop-shadow-md rounded">マイページ</div>
            </div>
            <div className="flex m-10 items-center">
                <img src={authUser.icon_path} className="w-14 h-14 border rounded-full bg-center bg-gray-200"/>
                {isEdit ? <input type="text" value={name} onKeyDown={handleKeyDown} onChange={(e)=>setName(e.target.value)} className="py-1 px-4 mx-5 my-auto text-2xl border border-gray-300 rounded-md" /> : <div className="mx-5 my-auto text-2xl">{authUser.name}</div>}
                {isEdit ? <button onClick={()=>setIsEdit(false)}><IconSquareRoundedX className="w-5 h-5 text-red-500"/></button> : <button onClick={()=>setIsEdit(true)} className="ml-5"><IconEdit className="w-5 h-5"/></button>}
            </div>

            <form>
                <div className="m-5">
                    <label htmlFor="email" className="block text-sm font-medium my-3 mx-3 dark:text-white">登録済みのメールアドレス</label>
                    <input type="email" id="email" value={email} onKeyDown={handleKeyDown} onChange={(e)=>setEmail(e.target.value)} className="w-1/2 ml-3 py-3 px-4 block border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" disabled={!isEdit}/>
                </div>
            </form>
        </>
    );
};
