import React from "react";
import { Book } from "../../types/Book";
import { Record } from "../../types/Record";

type Props = {
    book: Book
    records: Record[]
}

export const FrontCover: React.FC<Props> = ({ book, records }) => {
    
    return (
        <>
        <div className="text-4xl my-20">{book.title}</div>
        <div className="text-xl my-10">{book.description}</div>
        <div className="text-lg my-10">
            <div>作成者：{book.user!.name}</div>
            <div>作成日：{new Date(book.created_at!).toLocaleDateString()}</div>
        </div>
        <div className="text-gray-500 my-10">{records.length != 0 ? `全${records.length}ページ` : "まだ記録はありません"}</div>
        </>
    )
}