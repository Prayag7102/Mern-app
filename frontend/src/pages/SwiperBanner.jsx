import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import { getBanners } from '../api/Banner';
import { toast } from 'react-toastify';

const SwiperBanner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getBanners();
        setBanners(response.data.banners);
      } catch (error) {
        toast.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <Swiper
      loop={banners.length > 1}
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
      {banners.map((banner, index) => (
        banner.imageUrl.map((url, imgIndex) => (
          <SwiperSlide key={`${index}-${imgIndex}`}>
            <img
              src={`https://ecommerce-backend-uqpq.onrender.com/uploads/${url}`}
              alt={`E-commerce Banner ${index + 1} - Image ${imgIndex + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))
      ))}
    </Swiper>
  );
};

export default SwiperBanner;
