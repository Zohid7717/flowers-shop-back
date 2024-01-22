interface BouquetsType {
  id: string
  name: string
  price: number
  discount_price: number | null
  image: string
}
//тип стейта
export interface BouquetStateType {
  list: BouquetsType[] | null
  loading: boolean
  status: string | null
  success: boolean
}