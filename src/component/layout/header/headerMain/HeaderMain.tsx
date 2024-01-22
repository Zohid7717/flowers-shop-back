import { FC, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import UContainer from '../../../ui/UContainer/UContainer'
import userIcon from '../../../../assets/icon/user-icon.svg'
import logo from '../../../../assets/icon/logo-icon.svg'

import './HeaderMain.scss'

const headerMain: FC = () => {
  const [viewBox, setViewBox] = useState(false)

  const handleViewer = () => {
    setViewBox(!viewBox)
  }
  

  return <div className='header-main'>
    <UContainer>
      <div className="header-main__relative-box">
        <div className="header-main__wrap">
        </div>
        <div className="header-main__mobile-nav">
          <div className="header-main__mobile-nav-menu" onClick={handleViewer}>
            <div className="header-main__mobile-nav-menu-btn">
              <span className="header-main__mobile-nav-menu-btn-line"></span>
            </div>
            <p>МЕНЮ</p>
          </div>
          <div className="header-main__mobile-nav-user">
            <Link to='/'>
              <img src={userIcon} alt="userIcon" />
            </Link>
          </div>
        </div>
        <div className={viewBox ? "header-main__box active-box" : "header-main__box"}>
          <div className="header-main__mobile">
            <div className="header-main__burger" onClick={handleViewer}>
              <div className="header-main__burger-btn"></div>
              <p className="header-main__burger-text">
                МЕНЮ
              </p>
            </div>
            <div className="header-main__mobile-logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="header-main__mobile-currency">
              <button>РУБ.</button>
              <button>ДОЛ.</button>
            </div>
          </div>
          <div className="header-main__menu">
            <div className="header-main__menu-nav">
              <ul className="header-main__menu-items">
                <li className="header-main__menu-item">
                  <Link to='catalog'>КАТАЛОГ</Link>
                </li>
                <li className="header-main__menu-item">
                  <Link to='discounts'>СКИДКИ</Link>
                </li>
                <li className="header-main__menu-item">
                  <Link to='reviews'>ОТЗЫВЫ</Link>
                </li>
                <li className="header-main__menu-item">
                  <Link to='contact'>КОНТАКТЫ</Link>
                </li>
              </ul>
            </div>
            <div className="header-main__logo">
              <Link to='/'>
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="header-main__menu-list">
              <ul className="header-main__menu-list-items">
                <li className="header-main__menu-list-item">
                  <Link to='FAQ'>ИНФОРМАЦИЯ ДЛЯ КЛИЕНТА</Link>
                </li>
              </ul>
              <NavLink to='/user/info' className="header-main__menu-user-wrap">
                <img src={userIcon} alt="userIcon" />
              </NavLink>
              <div className="header-main__currancy">
                <button>РУБ.</button>
                <button>ДОЛ.</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
}

export default headerMain