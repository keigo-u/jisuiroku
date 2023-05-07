import React, { useState } from "react";
import { useBooks, useCreateBook } from "../../queries/BookQuery";
import { Book } from "../../types/Book";
import Card from "./Card";
import FormModal from "./FormModal";
import EditModal from "./EditModal";

const HomePage: React.FC = () => {

    const { data:books, status } = useBooks();

    if (status === 'loading') {
        return(
            <>
            <div className="text-2xl m-5">じすいろく一覧</div>
            <button type="button" className="py-3 px-4 ml-3 mb-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-form-modal">
                新規作成
            </button>
            <div className="text-center">読み込み中です。</div>
            <FormModal />
            </>
        )
    } else if (status === 'error') {
        return(
            <>
            <div className="text-2xl m-5">じすいろく一覧</div>
            <button type="button" className="py-3 px-4 ml-3 mb-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-form-modal">
                新規作成
            </button>
            <div className="text-center">データの読み込みに失敗しました。</div>
            <FormModal />
            </>
        )
    } else if (!books || books.length <= 0) {
        return(
            <>
            <div className="text-2xl m-5">じすいろく一覧</div>
            <button type="button" className="py-3 px-4 ml-3 mb-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-form-modal">
                新規作成
            </button>
            <div className="text-center">登録されている自炊録はありません</div>
            <FormModal />
            </>
        )
    }

    return(
        <>
        <div className="text-2xl m-5">じすいろく一覧</div>

        <button type="button" className="py-3 px-4 ml-3 mb-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-form-modal">
            新規作成
        </button>

        <div className="flex flex-wrap">
            { books.map((book: Book) => (
                <div key={book.id}>
                    <Card book={book} />
                    <EditModal book={book}/>
                </div>
            ))}
        </div>

        <FormModal />
        </>
    );
};

export default HomePage;