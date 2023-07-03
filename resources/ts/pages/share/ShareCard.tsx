import React, { useState } from "react";
import { Book } from "../../types/Book";
import { Link } from "react-router-dom";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useFavorites, useUnFavorites } from "../../queries/FavoriteQuery";

type Props = {
    book: Book
}

const ShareCard: React.FC<Props> = ({ book }) => {
    
    const [isFavorite, setIsFavorite] = useState(book.is_favorite)
    const favorite = useFavorites()
    const unFavorite = useUnFavorites()
    const handleFavorite = (id: number) => {
        if(isFavorite) {
            unFavorite.mutate(id)
            setIsFavorite(false)
        } else {
            favorite.mutate(id)
            setIsFavorite(true)
        }
    }
    return (
        <div className="w-40 h-52 m-2 flex flex-col bg-beige drop-shadow-md shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            {isFavorite
                ? <button onClick={() => handleFavorite(book.id!)} className="ml-auto mr-0 text-slate-400"><IconHeartFilled className="text-red-500 w-4 h-4" /></button>
                : <button onClick={() => handleFavorite(book.id!)} className="ml-auto mr-0 text-slate-400"><IconHeart className="w-4 h-4"/></button>}
            <div className="h-48 flex flex-col items-center justify-between">
                <h3 className="my-5 text-lg font-bold text-gray-800 dark:text-white">
                    {book.title}
                </h3>
                <div className="mt-1 font-medium uppercase text-gray-500 dark:text-gray-500">
                    {book.created_by!}
                </div>
                <Link to={"/book"} state={{book: book}} className="mt-auto mb-0 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700">
                    記録を確認する
                    <svg className="w-2.5 h-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default ShareCard;