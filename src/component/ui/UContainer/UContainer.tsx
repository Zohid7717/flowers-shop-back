import { FC, ReactNode } from 'react'
import './UContainer.scss'

export const UContainer: FC<{children?: ReactNode}> = ({children}) => {
  return <div className='UContainer'>
    {children}
  </div>
}

export const WorkspaceContainer: FC<{ children?: ReactNode }> = ({ children }) => {
  return <div className='WorkspaceContainer'>
    {children}
  </div>
}