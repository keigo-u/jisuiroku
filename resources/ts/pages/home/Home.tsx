import React from "react";
import { useBooks } from "../../queries/BookQuery";
import { Book } from "../../types/Book";
import Card from "./Card";

const HomePage: React.FC = () => {

    const { data:books, status } = useBooks();

    if (status === 'loading') {
        return <div className="text-center">読み込み中です。</div>;
    } else if (status === 'error') {
        return <div className="text-center">データの読み込みに失敗しました。</div>;
    } else if (!books || books.length <= 0) {
        return <div className="text-center">登録されている自炊録はありません</div>;
    }

    return(
        <>
        <div className="text-2xl m-5">Home</div>

        <div className="flex">
            { books.map((book: Book) => (
                <Card book={book} key={book.id} />
            ))}
        </div>
        </>
    );
};

export default HomePage;