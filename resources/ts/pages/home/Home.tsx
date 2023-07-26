import React from "react";
import { useBooks } from "../../queries/BookQuery";
import { Book } from "../../types/Book";
import Card from "./Card";
import FormModal from "./FormModal";
import EditModal from "./EditModal";
import { useGetFavorites } from "../../queries/FavoriteQuery";
import ShareCard from "../share/ShareCard";
import { IconPencilPlus } from "@tabler/icons-react";
import { Helmet } from "react-helmet-async";

const HomePage: React.FC = () => {

    const componentName = 'ホーム'
    const { data:books, status } = useBooks();

    return(
        <>
        <Helmet><title>{componentName}</title></Helmet>
        <TitleBar />

        {status === 'loading' ? (
            <div className="text-center">読み込み中です。</div>
        ) : status === 'error' ? (
            <div className="text-center">データの読み込みに失敗しました。</div>
        ) : !books || books.length <= 0 ? (
            <div className="text-center">登録されている自炊録はありません</div>
        ) : (
            <div className="flex flex-wrap">
                { books.map((book: Book) => (
                    <div key={book.id}>
                        <Card book={book} />
                        <EditModal book={book}/>
                    </div>
                ))}
            </div>
        )}

        <FavoriteField />

        <FormModal />
        </>
    );
};

const TitleBar = () => {
    return (
        <>
        <div className="flex justify-between">
            <div className="text-2xl m-5 px-12 py-2 bg-brown drop-shadow-md rounded">自炊録</div>

            <button type="button" className="py-2 px-5 mx-2 my-5 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold drop-shadow-md bg-sky-200 text-gray-600 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-form-modal">
                <IconPencilPlus />
                新規作成
            </button>
        </div>
        </>
    )
}

const FavoriteField = () => {

    const { data:favorites, status:favo_status } = useGetFavorites();

    return (
        <>
        <div className="flex">
            <div className="text-2xl m-5 px-12 py-2 bg-brown drop-shadow-md rounded">お気に入り</div>
        </div>
        {favo_status === 'loading' ? (
            <div className="text-center">読み込み中です。</div>
        ) : favo_status === 'error' ? (
            <div className="text-center">データの読み込みに失敗しました。</div>
        ) : !favorites || favorites.length <= 0 ? (
            <div className="text-center">お気に入り登録されている自炊録はありません</div>
        ) : (
            <div className="flex flex-wrap">
                { favorites.map((book: Book) => (
                    <div key={book.id}>
                        <ShareCard book={book} />
                    </div>
                ))}
            </div>
        )}
        </>
    )
}

export default HomePage;