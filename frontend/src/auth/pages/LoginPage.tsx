import { Login } from "@mui/icons-material"
import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { AuthLayout } from "../layout/AuthLayout"

import { RootState, useAppDispatch } from "../../store"

import { useForm,SubmitHandler } from "react-hook-form"
import { startLogin } from "../../store/auth"
import { useSelector } from "react-redux"

import LogoFarmacia from './../../assets/farmacia_logo.png'

type Inputs = {
  username : string,
  password : string
}

export const LoginPage = () => {
  
  const dispatch = useAppDispatch()
  const { register,handleSubmit,formState:{ errors } } = useForm<Inputs>()

  const onLoginSubmit : SubmitHandler<Inputs> = (data) => {
    dispatch(startLogin(data))
  }

  const { errorMessage } = useSelector((state:RootState)=>state.auth)

  return (
    <AuthLayout>
      <form 
      aria-label="submit-form-login"
      className="animate__animated animate__fadeIn animate__faster" onSubmit={handleSubmit(onLoginSubmit)} >
        <Box width="100%" style={{ display: "grid", placeItems: "center" }}>
          <img src={LogoFarmacia} alt="" style={{ height: "150px", display: "block", margin: "auto" }} />
        </Box>
        <Grid container width={"100%"} direction="column" >
          <Typography variant='h6' textAlign={"center"} textTransform="uppercase" >La casa de la salud</Typography>
          <Typography textAlign={"center"} color="rgba(255,255,255,0.5)" >Login</Typography>
          <Grid container style={{ display: "flex", marginTop: "1em", gap: "1em" }}>
            <TextField
              label="Username"
              type="text"
              id="username"
              placeholder="Admin123"
              // name="username"
              { ...register("username",{
                required : {
                  value : true,
                  message  :"El username es necesario"
                },
                minLength:{
                  value  : 5,
                  message : "El username debe de tener 5 caracteres como mínimo"
                },
              })}
              
              helperText={errors.username?.message}
              error={!!errors.username}
              variant="filled"
              autoComplete="off"
              fullWidth
              inputProps={{
                "aria-label":'username'
              }}
            />
            <TextField
              label="Password"
              type="password"
              id="password"
              inputProps={{
                "aria-label":'password'
              }}
              placeholder="***********"
              // name="password"
              
              { ...register("password",{
                required : {
                  value : true,
                  message  :"El password es necesario"
                },
                minLength:{
                  value  : 5,
                  message : "El password debe de tener 5 caracteres como mínimo"
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="off"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={ 12 } display={ !!errorMessage ? '': 'none'} style={{ marginTop:"0.8em" }}>
            <Alert severity='error'>{ errorMessage }</Alert>
          </Grid>
          <Grid item marginTop={"1em"}>
            <Button 
            id="btn-login"
            aria-label="btn-login"
            variant="contained" 
            fullWidth style={{ backgroundColor: "#255EAF", fontWeight: "bold", padding: "10px 0" }}
              // onClick={onSubmit}
              type="submit"
            >Login&nbsp;<Login /></Button>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

// https://formik.org/docs/examples/with-material-ui
// https://github.com/infodp/react-hook-forms/blob/main/src/components/FormValidation.js