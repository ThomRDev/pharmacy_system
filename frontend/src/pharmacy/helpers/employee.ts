import { AxiosError } from "axios"
import { pharmacyApi } from "../../apis"

export const getAllEmployees = async () => {
  try {
    const { data } = await pharmacyApi.get("/employees",{
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  } catch (error) {
    return (error as AxiosError ).response?.data
  }
}

export const createNewEmployee = async (employee:any) => {
  try{
    const { data } = await pharmacyApi.post("/employees/create",{
      ...employee
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