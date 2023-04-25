import React from "react";
import { Book } from "../../types/Book";
import { Record } from "../../types/Record";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
    page: number
    book: Book
    records: Record[]
}

export const PageContent: React.FC<Props> = ({ page, records }) => {
    const record = records[page-1]
    return (
        <>
        <div className="text-left text-lg my-3">{new Date(record.recorded_at).toLocaleDateString()}</div>

        <Swiper navigation={true} pagination={true} modules={[Navigation, Pagination]}>
        {record.images?.length != 0 && record.images?.map((image, index) => (
            <SwiperSlide key={index}>
            <div  className="my-2 rounded">
                <img src={image.path} className="mx-auto"/>
            </div>
            </SwiperSlide>
        ))}
        </Swiper>
        {record.recipes?.length != 0 && record.recipes?.map((recipe, index) => (
            <div key={index} className="text-left">
                <div className="text-lg my-2 pl-3 border rounded-lg">料理{index+1}</div>
                <div>
                    <div>料理名：{recipe.name}</div>
                    <div>レシピもしくはリンク：{recipe.detail}</div>
                </div>
            </div>
        ))}
        </>
    )
}