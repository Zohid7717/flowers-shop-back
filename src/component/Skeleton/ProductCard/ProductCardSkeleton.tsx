import { FC } from 'react'
import ContentLoader from 'react-content-loader'

const ProductCardSkeleton: FC = () => (
  <ContentLoader 
    speed={2}
    width={1140}
    height={1000}
    viewBox="0 0 1140 1000"
    backgroundColor="#f3f3f3"
    foregroundColor="#e4feda"
  >
    <rect x="25" y="105" rx="5" ry="5" width="220" height="10" /> 
    <rect x="24" y="0" rx="10" ry="10" width="263" height="242" /> 
    <rect x="42" y="258" rx="10" ry="10" width="224" height="48" /> 
    <rect x="44" y="316" rx="10" ry="10" width="224" height="22" /> 
    <rect x="43" y="373" rx="10" ry="10" width="224" height="48" />
  </ContentLoader>
)

export default ProductCardSkeleton