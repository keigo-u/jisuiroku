import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecords } from "../../queries/RecordQuery";
import { FrontCover } from "./FrontCover";
import { PageContent } from "./PageContent";
import { NaviButton } from "./NaviButton";

const DetailPage: React.FC = () => {

    const [page, setPage] = useState<number>(0)
    const nextPage = () => {setPage((prevNum) => prevNum + 1)}
    const prevPage = () => {setPage((prevNum) => prevNum - 1)}
    const returnTop = () => {setPage(0)}
    const { state: { book } } = useLocation()
    const { data:records, status } = useRecords(book.id)

    if (status === 'loading') {
        return <div className="text-center">読み込み中です。</div>;
    }  else if (status === 'error') {
        return <div className="text-center">データの読み込みに失敗しました。</div>;
    }

    return (
        <>
        <div className="w-4/5 h-95% mb-10 p-12 mx-auto border rounded-l-lg drop-shadow-lg bg-white text-center overflow-scroll">
            {page == 0
            ? <FrontCover book={book} records={records} nextPage={nextPage} />
            : <PageContent page={page} book={book} records={records} prevPage={prevPage} nextPage={nextPage} returnTop={returnTop} />}
            <NaviButton page={page} pageLength={records.length} prev={prevPage} next={nextPage} top={returnTop} />
        </div>
        </>
    )
}

export default DetailPage