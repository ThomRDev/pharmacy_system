import { Autocomplete, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import { useGetLaboratoriesQuery } from "../../store/apis/laboratoryApi"
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SaveIcon from '@mui/icons-material/Save';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { RootState, useAppDispatch } from "../../store";
import { startCreatingNewProduct } from "../../store/inventory/thunks";
import { useSelector } from "react-redux";
import { useEffect } from "react";

type ProductTypes = {
  price: string
  name: string
  stock: string
  therapeutic_description: string
  expiration_date: string
  laboratory: any
}

export const ModalCreateProduct = ({ onCloseModal,handleClickNotification } : any) => {
  const { control,register, handleSubmit, formState: { errors } } = useForm<ProductTypes>()
  const labotariesResponse = useGetLaboratoriesQuery({})

  const { messageSaved} = useSelector((state:RootState)=>state.product)

  const dispatch = useAppDispatch()

  const onSaveProduct: SubmitHandler<ProductTypes> = (data) => {
    // console.log("🚀 ~ file: ModalCreateProduct.tsx ~ line 21 ~ ModalCreateProduct ~ data", data)
    dispatch(startCreatingNewProduct(data))
    handleClickNotification()
  }

  useEffect(()=>{
    if(!!messageSaved){
      onCloseModal()
    }
    // if(!!messageSaved) {
    // }
  },[messageSaved])

  return (
    <form onSubmit={handleSubmit(onSaveProduct)}>
      <Grid container spacing={3}>
        <Grid item sx={{ display: "flex", gap: "1em", width: "100%" }} >
          <Typography variant="h4"><MedicalServicesIcon />&nbsp;Agregar Nuevo Producto</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", gap: "1em", width: "100%" }}  >
          <TextField 
          aria-label="txtNameProduct"
          id="txtNameProduct"
          sx={{ flex: 1 }}

            {...register("name", {
              required: {
                value: true,
                message: "El nombre del producto es necesario"
              }

            })}
            label="Producto"
            helperText={errors.name?.message}
            error={!!errors.name}
          />
          <TextField sx={{ flex: 1 }}
            type="number"
            label="Stock"
            aria-label="txtStock"
          id="txtStock"
            {...register("stock", {
              required: {
                value: true,
                message: "El stock es necesario"
              },
              min: {
                value: 1,
                message: "el valor minimo es 1"
              }

            })}
            helperText={errors.stock?.message}
            error={!!errors.stock}
          />
        </Grid>
        <Grid item sx={{ display: "flex", gap: "1em", width: "100%" }} >
          <TextField sx={{ flex: 1 }}
            label="Precio"
            aria-label="txtPrice"
            id="txtPrice"
            InputProps={{
              startAdornment: <InputAdornment position="start">S/</InputAdornment>,
            }}
            {...register("price", {
              required: {
                value: true,
                message: "El stock es necesario"
              },
              min: {
                value: 10,
                message: "el valor minimo es 10 soles"
              }
            })}
            helperText={errors.price?.message}
            error={!!errors.price}
          />

          <TextField 
            aria-label="txtDescription"
            id="txtDescription"
            sx={{ flex: 1 }}
            {...register("therapeutic_description", {
              required: {
                value: true,
                message: "El nombre del producto es requerido"
              }
            })}
            label="Desc. Terapeutica"
            helperText={errors.therapeutic_description?.message}
            error={!!errors.therapeutic_description}
          />
        </Grid>
        <Grid item sx={{ display: "flex", gap: "1em", width: "100%" }} >
          <LocalizationProvider dateAdapter={AdapterMoment}>
          <Controller
              control={control}
              name="expiration_date"
              defaultValue={moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Fecha de expiracion"
                  value={value}
                  onChange={data => onChange(moment(data).format('YYYY-MM-DD HH:mm:ss'))}
                  renderInput={(params) => <TextField sx={{ flex: 1 }} {...params} />}
                />
              )}
            />
            {labotariesResponse.isSuccess &&
              <Controller
                name="laboratory"
                defaultValue={labotariesResponse.data?.data[0]}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    disablePortal
                    options={labotariesResponse.data?.data}
                    value={value}
                    getOptionLabel={(option: any) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    sx={{ flex: 1 }}
                    renderInput={(params) => <TextField   {...params} label="Laboratorio" />}
                    onChange={(_, data) => {
                      onChange(data)
                      return data
                    }}
                  />
                )}
              />
            }
          </LocalizationProvider>
        </Grid>
        <Grid item sx={{ display: "flex", gap: "1em", width: "100%" }} >
          <Button 
          aria-label="btn-save"
          id="btn-save"
          type="submit" variant="contained" sx={{ background: "#068E9E", "&:hover": { background: "#068f9eac" } }}><SaveIcon />&nbsp;Guardar Cambios</Button>
        </Grid>
      </Grid>
    </form>
  )
}
