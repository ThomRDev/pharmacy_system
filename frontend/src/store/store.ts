import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { inventoryApi } from "./apis/invetoryApi";
import { laboratoryApi } from "./apis/laboratoryApi";
import { authSlice } from "./auth";
import { productSlice } from "./inventory/inventorySlice";
import { laboratorySlice } from "./laboratory/laboratorySlice";
import { employeeSlice } from "./employee/employeeSlice";

export const store = configureStore({
  reducer :{
    auth : authSlice.reducer,
    product : productSlice.reducer,
    employee : employeeSlice.reducer,
    laboratoryStore : laboratorySlice.reducer,
    [inventoryApi.reducerPath] : inventoryApi.reducer,
    [laboratoryApi.reducerPath] : laboratoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(inventoryApi.middleware).concat(laboratoryApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 