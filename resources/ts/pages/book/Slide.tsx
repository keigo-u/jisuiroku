import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as TypeOfSwiper } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Image } from '../../types/Record';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

type Props = {
    images: Image[];
};

export const Slide: React.FC<Props> = ({ images }) => {
    const [thumbsSwiper, setTumbsSwiper] = useState<TypeOfSwiper | null>(null);

    return (
        <div className='w-2/3 mx-auto relative'>
            <Swiper spaceBetween={10} navigation={true} thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Navigation, Thumbs]} className='h-4/5 my-2'>
                {images.map((image, index) => (
                    <SwiperSlide key={index}><img src={image.url} className='mx-auto rounded-xl shadow-xl' /></SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={(swiper) => setTumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className='h-1/5'
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}><img src={image.url} className='mx-auto rounded-xl' /></SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
