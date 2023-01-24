import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductDTO {
  price : string
  name : string
  stock : string
  therapeutic_description : string
  expiration_date : string
  laboratory : any
  id?:string
}

export interface InvetoryState {
  isSaving : boolean
  messageSaved :string
  error : string | null
}
const initialState:InvetoryState = {
  isSaving : false,
  messageSaved : "",
  error : null
}
export const productSlice = createSlice({
  name  : 'product',
  initialState,
  reducers : {
    // update and create
    savingProduct : (state:InvetoryState) => {
      state.isSaving = true
    },
    setMessage : (state:InvetoryState,action:PayloadAction<string>) => {
      state.messageSaved = action.payload
    },
    clearProduct : (state:InvetoryState) => {
      state.isSaving = false
      state.messageSaved = ``
      state.error = null
    },
    setError : (state:InvetoryState,action:PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})
export const { savingProduct,setMessage,clearProduct,setError } = productSlice.actions