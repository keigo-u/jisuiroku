import React from "react";
import { Book } from "../../types/Book";
import { Link } from "react-router-dom";
import { IconEdit, IconLock } from "@tabler/icons-react";

type Props = {
    book: Book
}

const Card: React.FC<Props> = ({ book }) => {
    return (
        <div className="w-40 h-52 m-2 flex flex-col bg-beige drop-shadow-md rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex">
                {book.is_private && <IconLock className="text-gray-500 w-5 h-5" />}
                <button className="ml-auto mr-0 text-gray-500" data-hs-overlay={`#hs-edit-${book.id}-modal`}><IconEdit className="w-4 h-4"/></button>
            </div>
            <div className="h-48 flex flex-col items-center justify-between">
                <h3 className="my-5 text-lg font-bold text-gray-800 dark:text-white">
                    {book.title}
                </h3>
                <div className="mt-1 font-medium uppercase text-gray-500 dark:text-gray-500">
                    {book.user!.name}
                </div>
                <Link to={"/detail"} state={{book: book}} className="mt-auto mb-0 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700">
                    記録を確認する
                    <svg className="w-2.5 h-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default Card;