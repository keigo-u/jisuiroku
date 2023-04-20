import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecords } from "../../queries/RecordQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DetailPage: React.FC = () => {

    const [page, setPage] = useState<number>(0)
    const nextPage = () => {setPage((prevNum) => prevNum + 1)}
    const prevPage = () => {setPage((prevNum) => prevNum - 1)}
    const { state: { book } } = useLocation()
    const { data:records, status } = useRecords(book.id)

    if (status === 'loading') {
        return <div className="text-center">読み込み中です。</div>;
    }  else if (status === 'error') {
        return <div className="text-center">データの読み込みに失敗しました。</div>;
    }

    if(page == 0) {
        return (
            <>
            <div>{book.title}</div>
            <div>{book.description}</div>
            <div>作成者：{book.user!.name}</div>
            <div>作成日：{new Date(book.created_at!).toLocaleDateString()}</div>
            <div>{records.length != 0 ? `全${records.length}ページ` : "まだ記録はありません"}</div>
            <button onClick={nextPage}>めくる</button>
            </>
        )
    } else {
        const record = records[page-1]
        return (
            <>
            <div>{new Date(record.recorded_at).toLocaleDateString()}</div>
            <Swiper navigation={true} modules={[Navigation, Pagination]}>
            {record.images?.length != 0 && record.images?.map((image) => (
                <SwiperSlide>
                <div>
                    <img src={image.path} />
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
            {record.recipes?.length != 0 && record.recipes?.map((recipe, index) => (
                <div>
                    <div>料理{index+1}</div>
                    <div>
                        <div>料理名：{recipe.name}</div>
                        <div>レシピもしくはリンク：{recipe.detail}</div>
                    </div>
                </div>
            ))}

            <button onClick={prevPage}>もどる</button>
            {page >= records.length
                ? 
                <div>
                    <button onClick={() => setPage(0)}>表紙に戻る</button>
                    <button>記録する</button>
                </div>
                : <button onClick={nextPage}>めくる</button>}
            </>
        )
    }
}

export default DetailPage