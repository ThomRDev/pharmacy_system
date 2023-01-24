import { pharmacyApi } from "../../apis";
import { ProductDTO } from "../../store/inventory/inventorySlice";
import { AxiosError } from "axios"
export const createNewProduct = async (product:ProductDTO) => {
  try{
    const { laboratory } = product
    delete product.laboratory
    const { data } = await pharmacyApi.post("/products/create",{
      ...product,
      laboratory : laboratory.id
    },{
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  }catch(err){
    return (err as AxiosError ).response?.data
  }
}

export const updateProduct = async (product:ProductDTO) => {
  try{
    const { laboratory } = product
    delete product.laboratory
    const { data } = await pharmacyApi.put("/products/update/"+product?.id,{
      ...product,
      laboratory : laboratory.id
    },{
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  }catch(err){
    return (err as AxiosError ).response?.data
  }
}


export const getProductById = async (id:string) => {
  try {
    const { data } = await pharmacyApi.get("/products/product/"+id,{
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  } catch (error) {
    return (error as AxiosError ).response?.data
  }
}

export const getAllProducts = async () => {
  try {
    const { data } = await pharmacyApi.get("/products",{
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  } catch (error) {
    return (error as AxiosError ).response?.data
  }
}


export const getMostSelledProducts = async () => {
  try {
    const { data } = await pharmacyApi.get("/products/most-selled",{
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  } catch (error) {
    return (error as AxiosError ).response?.data
  }
}