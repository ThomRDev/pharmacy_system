import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LaboratoryDTO {
  id: string,
  createdAt: string,
  updatedAt: string,
  address: string,
  description: string,
  name: string
}

export interface LaboratoryState {
  isSaving : boolean
  messageSaved :string
  error : string | null
}
const initialState:LaboratoryState = {
  isSaving : false,
  messageSaved : "",
  error : null
}
export const laboratorySlice = createSlice({
  name  : 'template',
  initialState,
  reducers : {
    savingLaboratory : (state:LaboratoryState) => {
      state.isSaving = true
    },
    setMessage : (state:LaboratoryState,action:PayloadAction<string>) => {
      state.messageSaved = action.payload
    },
    clearLaboratory : (state:LaboratoryState) => {
      state.isSaving = false
      state.messageSaved = ``
      state.error = null
    },
    setError : (state:LaboratoryState,action:PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})
export const { savingLaboratory,setMessage,clearLaboratory,setError  } = laboratorySlice.actions