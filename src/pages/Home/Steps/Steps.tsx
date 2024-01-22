import { FC } from 'react'
import steps_bg1 from '../../../assets/service-img/Group23.png'
import steps_bg2 from '../../../assets/service-img/Group24.png'
import './Steps.scss'
import UContainer from '../../../component/ui/UContainer/UContainer'

type stepsObjType = {
  number: number,
  title: string,
  text: string
}

const Steps: FC = () => {
  const stepsObj: stepsObjType[] = [
    {
      number: 1,
      title: 'Выберите букет;',
      text: 'В каталоге выберите понравившийся букет;'
    },
    {
      number: 2,
      title: 'Выберите размер и дополнение;',
      text: 'На странице с описанием букета выберите подходящий размер. По желанию, добавьте к букету мягкую игрушку, сладости или любой другой подарок;'
    },
    {
      number: 3,
      title: 'Укажите данные для доставки;',
      text: 'Заполните форму доставки и оплатите заказ удобным для вас способом;'
    },
    {
      number: 4,
      title: 'Букет готов!',
      text: 'Букет будет собран из свежайших цветов и доставлен получателю к указанной дате и времени.'
    }
  ]
  return <div className='steps'>
    <div className="steps__bg1">
      <img src={steps_bg1} alt="bg1" />
    </div>
    <div className="steps__bg2">
      <img src={steps_bg2} alt="bg2" />
    </div>
    <UContainer>
      <div className="steps__content">
        <p className="steps__title"> <span className='green'>ЗАКАЗАТЬ</span> В 5 ШАГОВ</p>
        <div className="steps__wrap">
          {stepsObj.map(item => (
            <div className="steps__item">
              <div className="steps__img">
                <p className="steps__img-text">{item.number}</p>
              </div>
              <div className="steps__text">
                <p className="steps__text-green green">{item.title}</p>
                <p className="steps__text-black">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UContainer>
  </div>
}

export default Steps