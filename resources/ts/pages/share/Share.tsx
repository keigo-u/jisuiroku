import React, { useState } from "react";
import { useAllBooks } from "../../queries/BookQuery";
import ShareCard from "./ShareCard";
import { Book } from "../../types/Book";

const SharePage = () => {

    const { data:allBooks, status } = useAllBooks();
    const [showBooks, setShowBooks] = useState<Book[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [inputValue, setInputValue] = useState<string>('')

    if (status === 'loading') {
        return(
            <>
            <div className="text-2xl m-5">みんなの投稿</div>
            <div className="text-center">読み込み中です。</div>
            </>
        )
    } else if (status === 'error') {
        return(
            <>
            <div className="text-2xl m-5">みんなの投稿</div>
            <div className="text-center">データの読み込みに失敗しました。</div>
            </>
        )
    } else if (!allBooks || allBooks.length <= 0) {
        return(
            <>
            <div className="text-2xl m-5">みんなの投稿</div>
            <div className="text-center">公開されている自炊録はありません</div>
            </>
        )
    }

    if(isLoading) {
        setShowBooks(allBooks)
        setIsLoading(false)
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
        <div className="text-2xl m-5">みんなの投稿</div>

        <input type="text" id="input-label" value={inputValue} onChange={handleInputChange} className="my-3 py-3 px-4 block border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="絞り込み検索"/>

        <div className="flex flex-wrap">
            { showBooks.map((book: Book) => (
                <div key={book.id}>
                    <ShareCard book={book} />
                </div>
            ))}
        </div>
        </>
    )
}

export default SharePage