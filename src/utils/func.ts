import { ReqFormData } from './types'
import axios from "./axios"


export const createId = () => {
  const timestamp = new Date().getTime()
  const uniqueId = `${timestamp}-${Math.floor(Math.random() * 1000)}`
  return uniqueId
}

export const addImages = async (arg: FileList | null, folder: string) => {
  if (arg) {
    const formData = new FormData()
    try {
      for (let i = 0; i < arg.length; i++) {
        formData.append('images', arg[i])
      }
      const requestData: ReqFormData = {
        formData: formData,
      }
      const res = await axios.post(folder, requestData.formData)
      const data = res.data.images
      return data
    } catch (error) {
      console.log('ошибка', error)
    }
  }
}

export const addImage = async (arg: File | null, folder: string) => {
  if (arg) {
    const formData = new FormData()
    formData.append('image', arg)
    try {
      const res = await axios.post(folder, formData)
      const data: string = res.data.image
      return data
      console.log(data)
    } catch (error) {
      console.log('ошибка', error)
    }
  }
}