import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../service/redux/hooks/hooks';
import CardBouquetImg from './CardBouquetImg/CardBouquetImg';
import { getBouquet } from '../../service/redux/Slices/bouquet/slice';
import { useParams } from 'react-router-dom';
import UContainer from '../ui/UContainer/UContainer';
import CardBouquetInfo from './CardBouquetInfo/CardBouquetInfo';

import "./CardBouquet.scss";
import BreadCrumbs from '../Breadcrumbs/BreadCrumbs';

const CardBouquet: FC = () => {
  const bouquet = useAppSelector(state => state.bouquet.list)
  const success = useAppSelector(state=>state.bouquet.success)
  const dispatch = useAppDispatch()
  const params = useParams()
  useEffect(() => {
    dispatch(getBouquet({ id: params.id }))
  }, [params.id])
  if (!success) {
    return <p>Продукт не найден!</p>
  }
  return <div className='card-bouquet'>
    <UContainer>
      <BreadCrumbs/>
      <div className="card-bouquet__wrap">
        <CardBouquetImg bouquetImg={bouquet?.bouquetImg} />
        <CardBouquetInfo bouquet = {bouquet} />
      </div>
    </UContainer>
  </div>
}

export default CardBouquet