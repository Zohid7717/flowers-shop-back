import { FC } from 'react'
import UContainer from '../../component/ui/UContainer/UContainer'
import img404 from '../../assets/notfound.avif'
import { Link } from 'react-router-dom'
import './NotFound.scss'

const NotFound: FC = () => {
  return <div className='not-found'>
    <UContainer>
      <div className="not-found__wrap">
        <div className="not-found__img">
          <img src={img404} alt="img404" />
        </div>
        <div className="not-found__content">
          <p className='not-found__text-bolt'>Упс... Что-то пошло не так.</p>
          <p className='not-found__text-small'>Перейдите на главную, а мы пока все починим.</p>
            <Link to='/' className='UBtn-active not-found__btn'>
              Главная
            </Link>
        </div>
      </div>
    </UContainer>
  </div>
}

export default NotFound