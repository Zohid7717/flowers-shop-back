import { FC, useEffect, useState } from 'react'
import Toast from './Toast'
import { useAppSelector } from '../../service/redux/hooks/hooks'

const ToastContainer: FC = () => {
  const userStatus = useAppSelector(state => state.auth.status)
  const message = useAppSelector(state => state.toast.message)
  const [toasts, setToasts] = useState<string[]>([])
  const addToast = (message: string) => {
    setToasts([...toasts, message])
  }
  const removeToast = (index: number) => {
    const newToasts = [...toasts]
    newToasts.splice(index, 1)
    setToasts(newToasts)
  }

  useEffect(() => {
    if (userStatus || message) {
      addToast(userStatus || message)
    }
  }, [userStatus, message])

  return <div className='toast-container'>
    {toasts.map((message, index) => (
      <Toast key={index} message={message} onClose={() => removeToast(index)} />
    ))}
  </div>
}

export default ToastContainer