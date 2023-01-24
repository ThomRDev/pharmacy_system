import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface EmployeeDTO {
  firstname : string
  lastname : string
  username : string
  email : string
  password : string
  age : number
  role : string
  dni : string
  id?:string
}

export interface EmployeeState {
  isSaving : boolean
  messageSaved :string
  error : string | null
}
const initialState:EmployeeState = {
  isSaving : false,
  messageSaved : "",
  error : null
}

export const employeeSlice = createSlice({
  name  : 'employee',
  initialState,
  reducers : {
    savingEmployee : (state:EmployeeState) => {
      state.isSaving = true
    },
    setMessage : (state:EmployeeState,action:PayloadAction<string>) => {
      state.messageSaved = action.payload
    },
    clearEmployee : (state:EmployeeState) => {
      state.isSaving = false
      state.messageSaved = ``
      state.error = null
    },
    setError : (state:EmployeeState,action:PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})
export const { savingEmployee,setMessage,clearEmployee,setError } = employeeSlice.actions