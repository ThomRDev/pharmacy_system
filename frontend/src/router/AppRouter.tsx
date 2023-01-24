import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCheckAuth } from "../hooks"
import { PharmacyRoutes } from "../pharmacy/routes/PharmacyRoutes"
import { AUTH_STATUS } from "../store/auth"
import { CheckingAuth } from "../ui/components/CheckingAuth"

export const AppRouter = () => {
  
  const status = useCheckAuth()

  if(status === AUTH_STATUS.CHECKING) {
    return <CheckingAuth />
  }
  return (
    <Routes>

      {
        status === AUTH_STATUS.AUTHENTICATED ? 
          <Route path="/*" element={ <PharmacyRoutes /> }  /> :
          <Route path="/auth/*" element={ <AuthRoutes /> } />
      }
      <Route path='/*' element={ <Navigate to='/auth/login' />  } />
    </Routes>
  )
}
