import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';


const MainLayout: FC = () => {
  return <div>
    <Header />
    <div className="mainLayout__container">
      <Outlet/>
    </div>
    <Footer />
  </div>
}

export default MainLayout