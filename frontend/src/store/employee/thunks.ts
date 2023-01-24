import { createNewEmployee } from './../../pharmacy/helpers/employee';
import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { clearEmployee, EmployeeDTO, savingEmployee, setError, setMessage } from "./employeeSlice"

export const startCreatingNewEmployee = (employee:EmployeeDTO):ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState) => {
    dispatch(savingEmployee())
    dispatch(clearEmployee())
    const response = await createNewEmployee(employee)
    if(!response.ok) return dispatch(setError("Error al crear un empleado"))
    dispatch(setMessage(`Empleado ${employee.username} creado correctamente`))
  }
}
