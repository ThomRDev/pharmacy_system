import { AxiosError } from "axios"
import { pharmacyApi } from "../../apis"

export const getResume = async () => {
  try {
    const { data } = await pharmacyApi.get("/resume",{
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  } catch (error) {
    return (error as AxiosError).response?.data
  }
}