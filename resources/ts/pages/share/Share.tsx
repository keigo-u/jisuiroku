import React from "react";
import { useAllBooks } from "../../queries/BookQuery";
import Card from "./Card";
import { Book } from "../../types/Book";

const SharePage = () => {

    const { data:allBooks, status } = useAllBooks();
    console.log(allBooks);

    if (status === 'loading') {
        return(
            <>
            <div className="text-2xl m-5">みんなの投稿一覧</div>
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
            <div className="text-2xl m-5">みんなの投稿一覧</div>
            <div className="text-center">公開されている自炊録はありません</div>
            </>
        )
    }

    return (
        <>
        <div className="text-2xl m-5">みんなの投稿一覧</div>

        <div className="flex flex-wrap">
            { allBooks.map((book: Book) => (
                <div key={book.id}>
                    <Card book={book} />
                </div>
            ))}
        </div>
        </>
    )
}

export default SharePage