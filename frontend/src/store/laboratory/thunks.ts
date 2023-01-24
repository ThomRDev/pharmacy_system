import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import { createNewLaboratory, updateLaboratory } from "../../pharmacy/helpers/laboratory"
import { RootState } from "../store"
import { clearLaboratory, savingLaboratory, setError, setMessage } from "./laboratorySlice"
export const startCreatingNewLaboratory = (laboratory:any):ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState) => {
    dispatch(savingLaboratory())
    dispatch(clearLaboratory())
    const response = await createNewLaboratory(laboratory)
    if(!response.ok) return dispatch(setError("Error al crear un laboratorio"))
    dispatch(setMessage(`Laboratorio ${laboratory.name} creado correctamente`))
  }
}

export const startUpdatingLaboratory = (laboratory:any):ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState) => {
    dispatch(savingLaboratory())
    dispatch(clearLaboratory())
    const response = await updateLaboratory(laboratory)
    if(!response.ok) return dispatch(setError("Error al actualizar un laboratorio"))
    dispatch(setMessage(`Laboratorio ${laboratory.name} actualizado correctamente`))
  }
}