import React, { useState } from "react";
import { useUpdateBook, useDeleteBook } from "../../queries/BookQuery";
import { Book } from "../../types/Book";
import { AlertModal } from "./AlertModal"

type Props = {
    book: Book
}

const EditModal: React.FC<Props> = ({book}) => {
    
    const updateBook = useUpdateBook()
    const deleteBook = useDeleteBook()
    const [title, setTitle] = useState<string>(book.title);
    const [description, setDescription] = useState<string>(book.description);
    const [is_private, setIsPrivate] = useState<boolean>(book.is_private);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        book.title = title;
        book.description = description;
        book.is_private = is_private;
        book.updated_at = new Date();
        e.preventDefault();
        console.log(book)
        updateBook.mutate(book);
    }

    const handleDelete = () => {
        console.log(book.id!)
        deleteBook.mutate(book.id!)
    }

    return (
        <>
        <div id={`hs-edit-${book.id}-modal`} className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
            <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
                <form id="input_form" onSubmit={handleSubmit} className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white">
                    編集する
                    </h3>
                    <button type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay={`#hs-edit-${book.id}-modal`}>
                    <span className="sr-only">Close</span>
                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
                    </svg>
                    </button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <label htmlFor="input_title" className="block text-sm font-medium mb-2 dark:text-white">タイトル</label>
                    <input type="text" id="input_title" value={title} onChange={(e) => setTitle(e.target.value)} className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" autoFocus/>
                </div>
                <div className="p-4 overflow-y-auto">
                    <label htmlFor="input_description" className="block text-sm font-medium mb-2 dark:text-white">詳細</label>
                    <input type="text" id="input_description" value={description} onChange={(e) => setDescription(e.target.value)} className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" autoFocus/>
                </div>
                <div className="p-4 overflow-y-auto">
                    <label htmlFor="is_private_switch" className="block text-sm font-medium mb-2 dark:text-white">非公開にする</label>
                    <input data-hs-theme-switch onChange={(e) => setIsPrivate(e.target.checked)} className="relative w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 rounded-full cursor-pointer transition-colors ease-in-out duration-200 border-2 border-transparent ring-1 ring-transparent focus:border-slate-700 focus:ring-slate-700 focus:outline-none appearance-none 
                    before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 
                    after:absolute after:right-1.5 after:top-[calc(50%-0.40625rem)] after:w-[.8125rem] after:h-[.8125rem] after:bg-no-repeat after:bg-[right_center] after:bg-[length:.8125em_.8125em] after:bg-[url('../svg/illustration/moon-stars.svg')] checked:after:bg-[url('../svg/illustration/brightness-high.svg')] after:transform after:transition-all after:ease-in-out after:duration-200 after:opacity-70 checked:after:left-1.5 checked:after:right-auto" type="checkbox" id="is_private_switch"></input>
                </div>
                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                    <button type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay={`#alert-${book.id}-modal`}>
                    削除する
                    </button>
                    <button type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay={`#hs-edit-${book.id}-modal`}>
                    閉じる
                    </button>
                    <button type="submit" className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay={`#hs-edit-${book.id}-modal`}>
                    更新する
                    </button>
                </div>
                </form>
            </div>
        </div>
        <AlertModal id={book.id!} handle={handleDelete}/>
        </>
    )
}

export default EditModal;