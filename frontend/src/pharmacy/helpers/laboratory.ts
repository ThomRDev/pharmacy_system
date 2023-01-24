import { AxiosError } from "axios"
import { pharmacyApi } from "../../apis"

export const createNewLaboratory = async (laboratory:any) => {
  try{
    const { data } = await pharmacyApi.post("/laboratories/create",{
      ...laboratory
    },{
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  }catch(err){
    return (err as AxiosError).response?.data
  }
}

export const getLaboratoryById = async (id:string) => {
  try {
    const { data } = await pharmacyApi.get("/laboratories/laboratory/"+id,{
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  } catch (error) {
    return (error as AxiosError ).response?.data
  }
}

export const updateLaboratory = async (laboratory:any) => {
  try{
    const { data } = await pharmacyApi.put("/laboratories/update/"+laboratory.id,{
      ...laboratory,
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

export const getLaboratories = async () => {
  try {
    const { data } = await pharmacyApi.get("/laboratories",{
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  } catch (error) {
    return (error as AxiosError ).response?.data
  }
}