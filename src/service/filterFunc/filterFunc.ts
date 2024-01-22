import { ProductItemsType } from '../redux/Slices/productItems/slice'
import { PriceType } from '../redux/Slices/productPrice/slice'
import { BouquetType } from '../redux/Slices/products/slice'

export const priceItems = async (data: BouquetType[], price: PriceType, items: ProductItemsType) => {
  const newArr1: BouquetType[] = []
  const newArr2: BouquetType[] = []
  const newArr: BouquetType[] = []
  data.forEach(element => {
    element.size.forEach(item => {
      if (!newArr1.includes(element) && item.price > price.value1 && item.price < price.value2) {
        newArr1.push(element)
      }
    })
    element.composition.forEach(el => {
      items.value.forEach(item => {
        if (!newArr2.includes(element) && el === item) {
          newArr2.push(element)
        }
      })
    })
  })
  newArr1.forEach(el => {
    newArr2.forEach(item => {
      if (el.id === item.id && !newArr.includes(item)) {
        newArr.push(item)
      }
    })
  })
  return newArr
}

export const price = async (data: BouquetType[], price: PriceType) => {
  let newArr: BouquetType[] = []
  data.forEach(element => {
    element.size.forEach(item => {
      if (item.price > price.value1 && item.price < price.value2 && !newArr.includes(element)) {
        newArr.push(element)
      }
    })
  });
  return newArr
}

export const items = async (data: BouquetType[], items: ProductItemsType) => {
  let newArr: BouquetType[] = []
  data.forEach(element => {
    element.composition.forEach(el => {
      items.value.forEach(item => {
        if (!newArr.includes(element) && el === item) {
          newArr.push(element)
        }
      })
    })
  })
  return newArr
}

export function sortByDate(products:BouquetType[]) {
  return [...products].sort(function(a, b) {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });
}

export function sortByPriceABC(products: BouquetType[]) {
  return [...products].sort(function (a, b) {
    const priceA = a.size[0].price
    const priceB = b.size[0].price
    return priceA - priceB
  })
}
export function sortByPriceDESC(products: BouquetType[]) {
  return [...products].sort(function (a, b) {
    const priceA = a.size[0].price
    const priceB = b.size[0].price
    return priceB - priceA
  })
}
export function sortByPopularity(products: BouquetType[]) {
  return [...products].sort(function (a, b) {
    const priceA = a.count
    const priceB = b.count
    return priceB - priceA
  })
}