import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation,EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import banner1 from '../assets/images/banner_1.jpg'
import banner2 from '../assets/images/banner_2.jpg'
import banner3 from '../assets/images/banner_3.jpg'

const SwiperBanner = () => {
  return (
    <Swiper
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
    modules={[EffectCreative,Autoplay]}
    >
      <SwiperSlide>
        <img
          src={banner1}
          alt="E-commerce Banner 1"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={banner3}
          alt="E-commerce Banner 2"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={banner2}
          alt="E-commerce Banner 3"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperBanner;
