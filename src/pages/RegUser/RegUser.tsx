import { FC } from 'react'
import UContainer from '../../component/ui/UContainer/UContainer'
import BreadCrumbs from '../../component/Breadcrumbs/BreadCrumbs'
import RegUserForm from './RegUserForm/RegUserForm'
import './RegUser.scss'
import { Link } from 'react-router-dom'

const RegUser: FC = () => {
  return <div className='register'>
    <UContainer>
      <div className="register__wrap">
        <div className="mobile-crumb">
          <BreadCrumbs />
        </div>
        <div className="register__menu">
          <p className='register__title'>Регистрация Пользователя</p>
          <div className='button' >
            <Link to='/user/login' >
              У меня есть аккаунта
            </Link>
          </div>
        </div>
        <div className="register__main">
          <div className="desktop-crumb">
            <BreadCrumbs />
          </div>
          <RegUserForm />
        </div>
      </div>
    </UContainer>
  </div>
}

export default RegUser