import React from "react"
import ContentLoader from "react-content-loader"

const DiscountSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={824}
    height={524}
    viewBox="0 0 824 524"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="3" ry="3" width="360" height="220" /> 
    <rect x="2" y="238" rx="3" ry="3" width="360" height="220" /> 
    <rect x="377" y="-3" rx="3" ry="3" width="360" height="220" />
  </ContentLoader>
)

export default DiscountSkeleton

