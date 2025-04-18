import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import { useBanner } from '../context/banner.context';

const SwiperBanner = () => {

  const {banner,loading1} = useBanner();

  if (loading1) return <div className="w-full  bg-gray-100 animate-pulse rounded-md" />;

  return (
    <Swiper
      loop={banner.length > 1}
      slidesPerView={1}
      slidesPerGroup={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      grabCursor={true}
      effect={'creative'}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }}
      modules={[EffectCreative, Autoplay, Pagination, Navigation]}
      pagination={{ clickable: true }}
      navigation={true}
    >
      {banner.map((banner, index) =>
        banner.imageUrl.map((url, imgIndex) => (
          <SwiperSlide key={`${index}-${imgIndex}`}>
            <div className="relative w-full pt-[40%]">
              <img
                src={`http://localhost:5000/uploads/${url}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
                loading='lazy'
                alt={`E-commerce Banner ${index + 1} - Image ${imgIndex + 1}`}
              />
            </div>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default SwiperBanner;
