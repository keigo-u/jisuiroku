import React from "react";
import { Book } from "../../types/Book";

type Props = {
    book: Book
}

const Card: React.FC<Props> = ({ book }) => {
    return (
        <div className="m-2 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] w-1/5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {book.title}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
                {new Date(book.created_at).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-800 dark:text-gray-400">
                {book.description}
            </p>
            <a className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700" href="#">
                記録を確認する
                <svg className="w-2.5 h-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </a>
        </div>
    );
}

export default Card;