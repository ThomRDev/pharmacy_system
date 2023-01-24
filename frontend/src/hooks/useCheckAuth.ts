import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store"
import { startCheckingAuthentication } from "../store/auth"

export const useCheckAuth = () => {
  const { status } = useSelector((state:RootState)=>state.auth)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(startCheckingAuthentication())
  },[])

  return status
}