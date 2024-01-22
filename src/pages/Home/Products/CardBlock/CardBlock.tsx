import { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCardSkeleton from '../../../../component/Skeleton/ProductCard/ProductCardSkeleton'
import ProductCard from './../ProductCard/ProductCard'
import { useAppDispatch, useAppSelector } from '../../../../service/redux/hooks/hooks'
import { BouquetType, getAllBouquets } from '../../../../service/redux/Slices/products/slice'
import { sortByDate, sortByPriceDESC, sortByPriceABC, sortByPopularity } from '../../../../service/filterFunc/filterFunc'
import './CardBlock.scss'

type CardBlockTypes = {
  sortHeadValue: string
}

const CardBlock: FC<CardBlockTypes> = ({ sortHeadValue }) => {
  const inputValue = useAppSelector(state => state.inputValue.value)
  const { list, loading } = useAppSelector((state) => state.dataProducts)
  const [lastList, setLastList] = useState<BouquetType[]>([])
  const listVariants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      }
    }),
    hidden: { opacity: 0 }
  }
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch()
    console.log(list)
  }, [])

  const bouquet = lastList.map((item, i) => (
    <motion.div
      key={item.id}
      variants={listVariants}
      initial='hidden'
      animate='visible'
      custom={i}
    >
      <ProductCard {...item} />
    </motion.div>
  ))
  const skeleton = [...new Array(3)].map((_, i) => <ProductCardSkeleton key={i} />)
  return <div className="products__main-list">
    {loading === true ?
      skeleton :
      bouquet}
  </div>
}

export default CardBlock