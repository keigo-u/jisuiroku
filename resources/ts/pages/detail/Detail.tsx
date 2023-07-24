import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecords } from "../../queries/RecordQuery";
import { FrontCover } from "./FrontCover";
import { PageContent } from "./PageContent";
import { NaviButton } from "./NaviButton";
import { CreateRecord } from "./CreateRecord_old";
import { IconArrowBack } from '@tabler/icons-react';

const DetailPage: React.FC = () => {

    const navigate = useNavigate()
    const [page, setPage] = useState<number>(1)
    const { state: { book } } = useLocation()
    console.log(book)
    const { data:records, status } = useRecords(book.id, page)

    if (status === 'loading') {
        return <div className="text-center">読み込み中です。</div>;
    }  else if (status === 'error') {
        return <div className="text-center">データの読み込みに失敗しました。</div>;
    }

    return (
        <>
        <button type="button" onClick={() => navigate(-1)} className="py-1 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
        戻る
        <IconArrowBack />
        </button>
        <div className="w-4/5 h-95% mb-10 p-12 mx-auto border rounded-l-2xl drop-shadow-lg bg-white text-center overflow-scroll">
            {records[0].recipes?.length != 0 && records[0].recipes?.map((recipe, index) => (
                <div key={index} className="text-left">
                    <div className="text-lg my-2 pl-3 border rounded-lg">料理{index+1}</div>
                    <div>
                        <div>料理名：{recipe.name}</div>
                        <div>レシピもしくはリンク：{recipe.detail}</div>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default DetailPage