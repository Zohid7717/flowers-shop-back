import { FC } from 'react'
import Hero from './Hero/Hero'
import Advantage from './Advantage/Advantage'
import Products from './Products/Products'
import Steps from './Steps/Steps'

import './Home.scss'

const Home: FC = () => {
  return <div>
    <Hero />
    <Advantage />
    <Products />
    <Steps />
  </div>
}

export default Home