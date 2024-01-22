import { FC, useEffect } from 'react'
import './Toast.scss'
import { useAppDispatch } from '../../service/redux/hooks/hooks'
import { clearMessage } from '../../service/redux/Slices/toast/slice'

interface ToastTypes {
  message: string | null,
  onClose: () => void
}

const Toast: FC<ToastTypes> = ({ message, onClose }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onClose()
    }, 10000)
    
    if (message?.length ! > 0) {
      dispatch(clearMessage())
    }
    return () => clearTimeout(timeOut)
  }, [onClose])
  return <div className='toast'>
    <p>{message}</p>
    <button onClick={onClose}>Закрыть</button>
  </div>
}

export default Toast