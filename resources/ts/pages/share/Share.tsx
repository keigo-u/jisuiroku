import React, { useState } from "react";
import { useAllBooks } from "../../queries/BookQuery";
import ShareCard from "./ShareCard";
import { Book } from "../../types/Book";
import { Helmet } from "react-helmet-async";

const SharePage = () => {

    const componentName = 'みんなの投稿'
    const { data:allBooks, status } = useAllBooks();
    const [showBooks, setShowBooks] = useState<Book[]>([])
    const [isSet, setIsSet] = useState(false)
    const [inputValue, setInputValue] = useState<string>('')

    if(!isSet && status == 'success') {
        setShowBooks(allBooks)
        setIsSet(true)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        search(e.target.value)
    }

    const search = (value: string) => {
        if (value === '') {
            setShowBooks(allBooks)
            return
        }

        const searchedBooks = allBooks.filter(
            (book) =>
            Object.values(book).filter(
                (item) =>
                item != undefined &&
                item != null &&
                typeof item === 'string' &&
                item.toUpperCase().indexOf(value.toUpperCase()) != -1
            ).length > 0
        )

        setShowBooks(searchedBooks)
    }

    return (
        <>
        <Helmet><title>{componentName}</title></Helmet>
        <div className="flex">
            <div className="text-2xl m-5 px-12 py-2 bg-brown drop-shadow-md rounded">みんなの投稿</div>
        </div>

        <input type="text" id="input-label" value={inputValue} onChange={handleInputChange} className="w-1/3 my-3 py-3 px-4 block border border-gray-400 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="絞り込み検索"/>

        {status === 'loading' ? (
            <div className="text-center">読み込み中です。</div>
        ) : status === 'error' ? (
            <div className="text-center">データの読み込みに失敗しました。</div>
        ) : !allBooks || allBooks.length <= 0 ? (
            <div className="text-center">公開されている自炊録はありません</div>
        ) : (
            <div className="flex flex-wrap">
                { showBooks.map((book: Book) => (
                    <div key={book.id}>
                        <ShareCard book={book} />
                    </div>
                ))}
            </div>
        )}
        </>
    )
}

export default SharePage