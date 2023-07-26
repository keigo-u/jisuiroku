import React, { useState } from "react";    
import { Link } from "react-router-dom";
import { IconHome, IconChalkboard, IconUser, IconMail, IconLogout } from '@tabler/icons-react';
import { useLogout } from "../queries/AuthQuery";

const Sidebar = () => {
    const [name, setName] = useState('ホーム')
    const [selecetedItem, setSelectedItem] = useState('')
    const styleSelecter = (item: string) => {
        const style = 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-sky-100 dark:bg-gray-900 dark:text-white'
        if(item == name) {
            return style + ' bg-sky-100'
        } else {
            return style
        }
    }
    const logout = useLogout()

    return (
        <>
        <div className="sticky top-0 inset-x-0 z-20 bg-skyblue border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center py-4">
            {/* <!-- Navigation Toggle --> */}
            <button type="button" className="text-gray-500 hover:text-gray-600" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
                <span className="sr-only">Toggle Navigation</span>
                <svg className="w-5 h-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </button>
            {/* <!-- End Navigation Toggle --> */}

            {/* <!-- Breadcrumb --> */}
            <div className="ml-3 flex items-center whitespace-nowrap min-w-0" aria-label="Breadcrumb">
                <div className="flex items-center text-sm text-gray-800 dark:text-gray-400">
                    {name}
                </div>
            </div>
            {/* <!-- End Breadcrumb --> */}
            </div>
        </div>
        {/* <!-- Sidebar --> */}
        <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-skyblue border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700">
            <div className="px-6">
                <Link to={`/home`} className="flex text-xl font-semibold dark:text-white" aria-label="Brand" onClick={()=>{setName('ホーム')}}>
                    <img src="/logo.png" className="w-8 h-8 mr-2"/>
                    Jisui6
                </Link>
            </div>

            <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
                <li>
                <Link to={`/home`} onClick={()=>{setName('ホーム')}} className={styleSelecter('ホーム')}>
                    <IconHome className="w-4 h-4"/>
                    ホーム
                </Link>
                </li>

                <li>
                <Link to={`/share`} onClick={()=>{setName('みんなの投稿')}} className={styleSelecter('みんなの投稿')}>
                    <IconChalkboard className="w-4 h-4"/>
                    みんなの投稿
                </Link>
                </li>

                <li>
                <Link to={`/mypage`} onClick={()=>{setName('アカウント')}} className={styleSelecter('アカウント')}>
                    <IconUser className="w-4 h-4"/>
                    アカウント
                </Link>
                </li>

                <li>
                <Link to={`/contact`} onClick={()=>{setName('お問い合わせ')}} className={styleSelecter('お問い合わせ')}>
                    <IconMail className="w-4 h-4"/>
                    お問い合わせ
                </Link>
                </li>
                <li>
                <div onClick={()=>{logout.mutate()}} className={styleSelecter('ログアウト')}>
                    <IconLogout className="w-4 h-4"/>
                    ログアウト
                </div>
                </li>
            </ul>
            </nav>
        </div>
        </>
    );
}

export default Sidebar;