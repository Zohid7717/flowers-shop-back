import { FC } from 'react'
import HeaderTop from './headerTop/HeaderTop'
import HeaderMain from './headerMain/HeaderMain'
import './Header.scss'


const Header: FC = () => {
  return <div className='header'>
    <HeaderTop />
    <HeaderMain/>
  </div>
}

export default Header