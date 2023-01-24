import axios from "axios"

export const pharmacyApi = axios.create({
  baseURL : "http://localhost:8000/api",
  // baseURL : "https://farmaciabackend-production.up.railway.app/api",
  headers : {
    "Content-Type" :"application/json",
  },
  withCredentials : true
})

// roles
// https://github.com/gitdagray/react_protected_routes/blob/main/src/components/RequireAuth.js