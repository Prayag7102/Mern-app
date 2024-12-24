import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Navigation, Pagination, Autoplay } from 'swiper/modules';

export const ProductImages = ({ product }) => {
  return (
    <div className="flex justify-center">
      <Swiper
        loop={product.otherImages.length > 1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        zoom={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Zoom, Navigation, Pagination, Autoplay]}
        className="w-full max-w-xl"
        spaceBetween={10}
        slidesPerView={1}
      >
        <SwiperSlide>
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            className="rounded-lg shadow-md object-contain"
          />
        </SwiperSlide>
        {product.otherImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={`http://localhost:5000/uploads/${img}`}
              alt={`${product.name} ${index + 1}`}
              className="max-w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}; 
