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
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchAndPreloadBanners = async () => {
      try {
        const response = await getBanners();
        const bannersData = response.data.banners;
        const preloadPromises = bannersData.flatMap(banner =>
          banner.imageUrl.map(url => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = `http://localhost:5000/uploads/${url}`;
              img.onload = resolve;
              img.onerror = resolve; 
            });
          })
        );

        await Promise.all(preloadPromises);

        setBanners(bannersData);
      } catch (error) {
        toast.error("Error fetching banners");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndPreloadBanners();
  }, []);

  if (loading) return <div className="w-full  bg-gray-100 animate-pulse rounded-md" />;

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
      {banners.map((banner, index) =>
        banner.imageUrl.map((url, imgIndex) => (
          <SwiperSlide key={`${index}-${imgIndex}`}>
            <img
              src={`http://localhost:5000/uploads/${url}`}
              height={'100%'}
              width={'100%'}
              loading='lazy'
              alt={`E-commerce Banner ${index + 1} - Image ${imgIndex + 1}`}
              style={{ objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default SwiperBanner;
