import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { getDiscounts } from '../../../service/redux/Slices/discount/slice'
import { getCourse } from '../../../service/redux/Slices/course/slice'
import DiscountCard from './DiscountCard/DiscountCard'
import DiscountSkeleton from '../../../component/Skeleton/DiscountSkeleton/DiscountSkeleton'
import { motion } from "framer-motion";
import './SettingBlock.scss'
import CourseCard from './CourseCard/CourseCard'

const SettingBlock: FC = () => {
  const discountList = useAppSelector(state => state.discount.list)
  const discountLoading = useAppSelector(state => state.discount.loading)
  const [discountListState, setDiscountListState] = useState(discountList)

  const courseList = useAppSelector(state => state.course.list)
  const courseLoading = useAppSelector(state => state.course.loading)
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
    dispatch(getDiscounts())
    dispatch(getCourse())
  }, [dispatch])


  useEffect(() => {
    if (discountList) {
      setDiscountListState([...discountList])
    }
  }, [discountList])

  const discountBox = Array.isArray(discountListState) ? discountListState.map((discount, index) => (
    <motion.div
      key={index}
      variants={listVariants}
      initial='hidden'
      animate='visible'
      custom={index}
    >
      <DiscountCard key={index} index={index} discount={discount} discountListState={discountListState} setDiscountListState={ setDiscountListState} />
    </motion.div>
  )) : null

  return <div className='setting'>
    <div className="setting__discount">
      <p>Настройка скидок:</p>
      <div className="setting__discount-form-wrap">
        {discountLoading === true ?
          <DiscountSkeleton /> :
          discountBox
        }
      </div>
    </div>
    <div className="setting__course">
      <p>Настройка курса:</p>
      <div className="setting__course-form-wrap">
        <CourseCard/>
      </div>
    </div>
  </div>
}

export default SettingBlock