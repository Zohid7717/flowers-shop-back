import { FC, ReactNode } from 'react'

export const UBtnActive: FC<{ children?: ReactNode }> = ({children}) => {
  return <div className='UBtn-active'>
    {children}
  </div>
}