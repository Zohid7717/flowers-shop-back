import { FC, ReactNode } from 'react'
import './UContainer.scss'

const UContainer: FC<{children?: ReactNode}> = ({children}) => {
  return <div className='UContainer'>
    {children}
  </div>
}

export default UContainer