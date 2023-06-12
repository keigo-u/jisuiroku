import React from "react";
import { useUser } from "../../queries/AuthQuery";

export const ProfilePage = () => {

    const { isLoading, data: authUser } = useUser();

    if(isLoading || !authUser) {
        return (
            <div>読み込み中です。</div>
        )
    }

    return (
        <>
            <div className="text-2xl m-5 font-bold">マイページ</div>
            <div className="flex m-10">
                <img src={authUser.icon_path} className="w-12 h-12 border rounded-full bg-center"/>
                <div className="mx-5 my-auto text-2xl">{authUser.name}</div>
            </div>

            <form>
                <div className="flex m-5">
                    <label htmlFor="email" className="block text-sm font-medium my-auto mx-3 dark:text-white">メールアドレス</label>
                    <input type="email" id="email" className="py-3 px-4 block border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                </div>
                <div className="flex m-5">
                    <label htmlFor="password" className="block text-sm font-medium my-auto mx-3 dark:text-white">パスワード</label>
                    <input type="password" id="password" className="py-3 px-4 block border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                </div>
            </form>
        </>
    );
};
