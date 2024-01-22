import { FC } from 'react'
import UContainer from '../../ui/UContainer/UContainer'
import { Link } from 'react-router-dom'
import FooterMain from './footerMain/FooterMain'

import './Footer.scss'

const Footer: FC = () => {
  return <div className='footer'>
    <div className="footer__wrap">
      <div className="footer__head">
        <UContainer>
          <ul className="footer__head-items">
            <li className="footer__head-item">
              <Link to="">Каталог</Link>
            </li>
            <li className="footer__head-item">
              <Link to="">Скидки</Link>
            </li>
            <li className="footer__head-item">
              <Link to="">Отзывы</Link>
            </li>
            <li className="footer__head-item">
              <Link to="">Контакты</Link>
            </li>
            <li className="footer__head-item">
              <Link to="">Оферта</Link>
            </li>
            <li className="footer__head-item">
              <Link to="">Информация для клиента</Link>
            </li>
          </ul>
        </UContainer>
      </div>
      <div className="footer__body">
        <UContainer>
          <FooterMain />
        </UContainer>
      </div>
    </div>
  </div>
}

export default Footer