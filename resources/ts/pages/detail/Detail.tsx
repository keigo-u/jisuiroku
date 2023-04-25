import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecords } from "../../queries/RecordQuery";
import { FrontCover } from "./FrontCover";
import { PageContent } from "./PageContent";
import { NaviButton } from "./NaviButton";
import { CreateRecord } from "./CreateRecord";
import { IconArrowBack } from '@tabler/icons-react';

const DetailPage: React.FC = () => {

    const navigate = useNavigate()
    const [page, setPage] = useState<number>(0)
    const { state: { book } } = useLocation()
    const { data:records, status } = useRecords(book.id)

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
        <div className="w-4/5 h-95% mb-10 p-12 mx-auto border rounded-l-lg drop-shadow-lg bg-white text-center overflow-scroll">
            {(()=>{
                if (page == 0) {
                    return <FrontCover book={book} records={records}/>
                } else if (page == -1) {
                    return <CreateRecord book={book} setState={setPage}/>
                } else {
                    return <PageContent page={page} book={book} records={records} />
                }
            })()}
            {page != -1 && <NaviButton page={page} pageLength={records.length} setState={setPage}/>}
        </div>
        </>
    )
}

export default DetailPage