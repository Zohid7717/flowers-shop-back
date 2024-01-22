import { FC, ReactNode } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAppSelector } from '../../service/redux/hooks/hooks'

const RequireAuth: FC<{ children?: ReactNode }> = ({ children }) => {
  const location = useLocation()
  const isAuth = useAppSelector(state=>state.auth.isAuth)
  if (!isAuth) {
    return <Navigate to='/user/login' state={{from: location}}/>
  }
  return children
}

export default RequireAuth