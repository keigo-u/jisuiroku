import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Record } from "../../types/Record";
import { useRecords } from "../../queries/RecordQuery";

const DetailPage: React.FC = () => {

    const { state: { book } } = useLocation()
    const { data:records, status } = useRecords(book.id)
    console.log(records)

    if (status === 'loading') {
        return <div className="text-center">読み込み中です。</div>;
    } else if (!records || records.length <= 0) {
        return <div className="text-center">記録がありません</div>;
    } else if (status === 'error') {
        return <div className="text-center">データの読み込みに失敗しました。</div>;
    }

    return (
        <>
        <div>detail</div>
        <div>
            {records.map((record: Record) => (
                <div key={record.id}>{`${record.recorded_at}`}</div>
            ))}
        </div>
        </>
    )
}

export default DetailPage