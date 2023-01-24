import { pharmacyApi } from "../apis"
import { AxiosError } from "axios"

export const pharmaryLogin = async ({ username,password }:{ username:string,password:string }) => {
  try{
    const { data} = await pharmacyApi.post("/login",{
      username,
      password
    })
    localStorage.setItem("token", data?.accessToken);
    return {
      ...data,
      ...data.employee
    }
  }catch(err){
    localStorage.removeItem("token");
    return (err as AxiosError ).response?.data
  }
}

export const pharmaryCheckAuth = async (token:string) => {
  try{
    const { data} = await pharmacyApi.post("/auth/check",{},{
      headers:{
        "Authorization" : `Bearer ${token}`
      }
    })
    return {
      ...data,
      ...data.data
    }
  }catch(err){
    localStorage.removeItem("token");
    return (err as AxiosError ).response?.data
  }
}