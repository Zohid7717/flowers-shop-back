import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './Hero.scss'
import UContainer from '../../../component/ui/UContainer/UContainer';

const Hero: FC = () => {

  return <div className='hero'>
    <div className="hero__slider-box">
      <Swiper
        spaceBetween={30}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={false}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="hero__1 hero__item"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero__2 hero__item"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero__3 hero__item"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero__4 hero__item"></div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div className="hero__content">
      <UContainer>
        <div className="hero__content-wrap">
          <h1><span className='green'>Купи</span> букет</h1>
          <h2>Получи <span className='green'>конфеты</span> в подарок</h2>
          <button className='hero__content-btn'>КУПИТЬ</button>
        </div>
      </UContainer>
    </div>
  </div>
}

export default Hero