import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import { createNewProduct, updateProduct } from "../../pharmacy/helpers/product"
import { RootState } from "../store"
import { clearProduct, ProductDTO, savingProduct, setError, setMessage } from "./inventorySlice"

export const startCreatingNewProduct = (product:ProductDTO):ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState) => {
    dispatch(savingProduct())
    dispatch(clearProduct())
    const response = await createNewProduct(product)
    if(!response.ok) return dispatch(setError("Error al crear un producto"))
    dispatch(setMessage(`Producto ${product.name} creado correctamente`))
  }
}

export const startUpdatingProduct = (product:ProductDTO):ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState) => {
    dispatch(savingProduct())
    dispatch(clearProduct())
    const response = await updateProduct(product)
    if(!response.ok) return dispatch(setError("Error al actualizar el producto"))
    dispatch(setMessage(`Producto ${product.name} actualizado correctamente`))
  }
}