import { FC } from 'react'
import {Link} from 'react-router-dom'
import UContainer from '../../../ui/UContainer/UContainer'
import locIcon from "../../../../assets/icon/location-icon.svg";
import whatsAppIcon from "../../../../assets/icon/whatsApp-icon.svg";
import cartIcon from "../../../../assets/icon/cart-icon.svg";

import './HeaderTop.scss'

const HeaderTop: FC = () => {
  return <div className="header-top">
    <UContainer>
      <div className="header-top__wrap">
        <div className="header-top__address">
          <Link to="/">
            <img src={locIcon} alt="location" className="header-top__address-img" />
            <p className="header-top__address-text">
              <span className='header-top__address-green-text'>г. Владивосток,</span>
              <span className='header-top__address-white-text'> ул. Пушкинская, 17 А</span>
            </p>
          </Link>
        </div>
        <div className="header-top__contact">
          <img src={whatsAppIcon} alt="contact" className="header-top__contact-img" />
          <p className="header-top__contact-text">
            <a href="tel:88083535335">+ 7 808 353 53 35</a>
            <a href="tel:88888888888">+ 7 888 888 88 88</a>
          </p>
        </div>
        <div className="header-top__cart">
          <Link to='/'>
          <img src={cartIcon} alt="cart" />
          <p className="header-top__cart-price">150 000 руб.</p>
          </Link>
        </div>
      </div>
    </UContainer>
  </div>
}

export default HeaderTop