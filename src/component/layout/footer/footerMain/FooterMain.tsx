import { FC } from 'react'
import { Link } from 'react-router-dom'
import locationIcon from '../../../../assets/icon/location-icon.svg'
import phoneIcon from '../../../../assets/icon/phone-icon.svg'
import clockIcon from '../../../../assets/icon/clock-icon.svg'
import FooterForm from '../footerForm/FooterForm'
import './FooterMain.scss'

const FooterMain: FC = () => {
  return <div className='footer-main'>
    <div className="footer-main__contact">
      <p className="footer-main__contact-title green">
        Контактная информация
      </p>
      <ul className="footer-main__contact-items">
        <li className="footer-main__contact-item">
          <img src={locationIcon} alt="location-icon" />
          <p>г. Владивосток, ул. Пушкинская, 17</p>
        </li>
        <li className="footer-main__contact-item">
          <img src={phoneIcon} alt="phone-icon" />
          <p>+ 7 888 888 88 88</p>
        </li>
        <li className="footer-main__contact-item">
          <img src={phoneIcon} alt="phone-icon" />
          <p>+ 7 888 888 88 88</p>
        </li>
        <li className="footer-main__contact-item">
          <img src={clockIcon} alt="clock-icon" />
          <p>Режим работы: Пн-Сб  с 8:00  до 22:00</p>
        </li>
      </ul>
    </div>
    <div className="footer-main__guest">
      <p className="footer-main__guest-title green">
        Для посетителей
      </p>
      <ul className="footer-main__guest-items">
        <li className="footer-main__guest-item">
          <Link to='#'>Оформление заказа</Link>
        </li>
        <li className="footer-main__guest-item">
          <Link to='#'>Вопросы и ответы</Link>
        </li>
        <li className="footer-main__guest-item">
          <Link to='#'>Изменение или отмена заказа</Link>
        </li>
        <li className="footer-main__guest-item">
          <Link to='#'>Способы доставки и оплаты</Link>
        </li>
      </ul>
    </div>
    <div className="footer-main__form">
      <FooterForm/>
    </div>
  </div>
}

export default FooterMain