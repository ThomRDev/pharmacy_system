import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const inventoryApi = createApi({
  reducerPath : "inventory",
  baseQuery : fetchBaseQuery({
    baseUrl : "http://localhost:8000/api",
    // baseUrl : "https://farmaciabackend-production.up.railway.app/api",
    prepareHeaders :(headers) => {
      const token = localStorage.getItem("token")
      headers.set('Content-Type', `application/json`)
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    }
  }),
  keepUnusedDataFor: 15,
  refetchOnMountOrArgChange: 15,
  endpoints: (builder) => ({
    getProducts : builder.query({
      query: () => "/products"
    }),
    getProductById : builder.query({
      query: (productID:string) => {
        return "/products/product/"+productID
      }
    }),

  })
})

export const { useGetProductsQuery,useGetProductByIdQuery } = inventoryApi