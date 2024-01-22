import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import UContainer from '../../../component/ui/UContainer/UContainer';
import 'swiper/css';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import './Advantage.scss'
import ad1 from '../../../assets/advantage-img/ad-01.jpg'
import ad2 from '../../../assets/advantage-img/ad-02.jpg'
import ad3 from '../../../assets/advantage-img/ad-03.jpg'
import ad4 from '../../../assets/advantage-img/ad-04.jpg'

const Advantage: FC = () => {
  return <div className='advantage'>
    <UContainer>
      <div className="advantage__swiper">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1110: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          loop={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="advantage__card-1 advantage__card">
              <img src={ad1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="advantage__card-2 advantage__card">
              <img src={ad2} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="advantage__card-3 advantage__card">
              <img src={ad3} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="advantage__card-4 advantage__card">
              <img src={ad4} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </UContainer>
  </div>
}

export default Advantage