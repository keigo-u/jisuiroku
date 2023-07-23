import React from "react";
import { useLocation } from "react-router-dom";
import { Book } from "../../types/Book";
import { Link } from "react-router-dom";
import { ReturnButton } from "./ReturenButton";
import { AddButton } from "./AddButton";

type stateParams  = {
    state: { book: Book }
}

const BookTopPage: React.FC = () => {
    const { state: { book } }: stateParams = useLocation()

    return (
        <>
        <ReturnButton />
        <div className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-beige mx-auto my-5 w-[32rem] h-[32rem]">
            <div className="text-2xl font-bold m-5">{book.title}</div>
            <div className="m-3">{book.description}</div>
            <div className="inline-flex m-1 justify-center items-center">
                <img src={book.user_icon} className="w-5 h-5 rounded-full border border-gray-500 mr-2"/>
                {book.created_by}
            </div>
            <div className="m-3">
                <div>作成日：{book.created_at && book.created_at.toString()}</div>
                <div className="my-auto">更新日：{book.updated_at && book.updated_at.toString()}</div>
            </div>
        </div>
        <div className="flex justify-center items-center">
            <Link to={`detail`} state={{book: book}} className="flex justify-center m-5 py-1 px-10 rounded-lg shadow-md bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">開く</Link>
        </div>
        <AddButton />
        </>
    )
}

export default BookTopPage