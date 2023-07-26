import React, { useState } from "react";
import { useUpdateUser, useUpdateUserIcon, useUser } from "../../queries/AuthQuery";
import { IconEdit, IconPhotoPlus, IconSquareRoundedX } from "@tabler/icons-react";
import { Helmet } from "react-helmet-async";

export const ProfilePage = () => {

    const componentName = 'マイページ'
    const { isLoading, data: authUser } = useUser()
    const updateUser = useUpdateUser()
    const updateUserIcon = useUpdateUserIcon()
    const [isEdit, setIsEdit] = useState(false)

    if(isLoading || !authUser) {
        return (
            <div>読み込み中です。</div>
        )
    }

    const [iconPath, setIconPath] = useState<string>(authUser.icon_path)
    const [name, setName] = useState(authUser.name)
    const [email, setEmail] = useState(authUser.email)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing || e.key !== 'Enter') return
        handleSubmit(e)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
        console.log('submit')
        e.preventDefault()
        setIsEdit(false)
        updateUser.mutate({name: name, email: email})
    }

    const handleButtonClick = () => {
        const imageInput = document.getElementById("icon")
        if(imageInput) {
            imageInput.click()
        }
    }

    const handleImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.currentTarget.files
        if (!files || files?.length === 0) return;
        const file = files[0]
        const data = new FormData();
        data.append('image', file)
        setIconPath(window.URL.createObjectURL(file))
        updateUserIcon.mutate(data)
        setIsEdit(false)
    }

    return (
        <>
            <Helmet><title>{componentName}</title></Helmet>
            <div className="flex">
                <div className="text-2xl m-5 px-12 py-2 bg-brown drop-shadow-md rounded">マイページ</div>
            </div>
            <div className="flex m-10 items-center">
                {isEdit
                ? 
                <>
                    <button className="relative" onClick={handleButtonClick}>
                        <IconPhotoPlus className="absolute w-6 h-6 p-1 z-10 right-0 bottom-0 border border-gray-400 bg-gray-200 rounded-full"/>
                        <img src={iconPath} className="w-16 h-16 border border-gray-400 rounded-full bg-center bg-gray-100"/>
                    </button>
                    <input type="file" id="icon" className="ml-5 hidden" accept="image/*" onChange={handleImage}/>
                </>
                : <img src={iconPath} className="w-16 h-16 border rounded-full bg-center bg-gray-100"/>}
                {isEdit ? <button onClick={()=>setIsEdit(false)}><IconSquareRoundedX className="w-5 h-5 ml-5 text-red-500"/></button> : <button onClick={()=>setIsEdit(true)} className="ml-5"><IconEdit className="w-5 h-5"/></button>}
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="m-3">
                    <label htmlFor="name" className="block text-sm font-medium mx-5 mb-2 dark:text-white">ユーザー名</label>
                    <input type="name" id="email" value={name} onKeyDown={handleKeyDown} onChange={(e)=>setName(e.target.value)} className="w-1/2 ml-3 py-3 px-4 block border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 disabled:bg-gray-100" disabled={!isEdit}/>
                </div>
                <div className="m-3">
                    <label htmlFor="email" className="block text-sm font-medium mx-5 mb-2 dark:text-white">登録済みのメールアドレス</label>
                    <input type="email" id="email" value={email} onKeyDown={handleKeyDown} onChange={(e)=>setEmail(e.target.value)} className="w-1/2 ml-3 py-3 px-4 block border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 disabled:bg-gray-100" disabled={!isEdit}/>
                </div>
                {/* <div className="mx-3 my-5 flex justify-center">
                    {isEdit && <button type="submit" className="px-5 py-2 mx-5 rounded-full shadow-sm bg-gray-400 hover:bg-gray-500">更新する</button>}
                </div> */}
            </form>
        </>
    );
};
