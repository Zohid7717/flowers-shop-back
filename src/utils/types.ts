export interface TypeForRegUser {
  username: string;
  nickname: string;
  password: string;
  adminpass?: string;
  tel?: string;
  ccn?: number | null | string;
}

export interface UserResType {
  username: string;
  nickname: string;
  password: string;
  admin: boolean;
  tel: string;
  ccn: number | null | string;
}

export interface TypeForLogUser {
  nickname: string;
  password: string;
}

export interface FormType {
  username: string
  nickname: string
  password: string
  tel: string
}

export interface BouquetType {
  _id: string
  name: string
  category: string
  composition: FlowerType[]
  size: SizeType[]
  count?: number
  status?: string
  bouquetImg: string[] | null
}

export interface FlowerType {
  _id: string
  flower_name: string
}

export interface SizeType {
  size_name: string | null
  size_price: number | null
  discount_price?: number | null
  size_use: boolean
  error: string | null
}

export interface PresentType {
  present_name: string
  present_price: number
  present_imgUrl: string
}

export interface ReqFormData {
  formData: FormData
}

export interface SelectFilesType extends File{
  name: string
}

type CartBouquetType = {
  id: string
  name: string
  size: string
  qty: number
  img: string
}

export interface CartType {

}

export interface RejectedAction {
  type: string;
  error: any;
  payload: any;
}