import { Autocomplete, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useGetLaboratoriesQuery } from '../../store/apis/laboratoryApi';
import { useGetProductByIdQuery } from '../../store/apis/invetoryApi';
import { Loader } from './Loader';
import moment from 'moment';
import { RootState, useAppDispatch } from '../../store';
import { startUpdatingProduct } from '../../store/inventory/thunks';
import { useSelector } from 'react-redux';
import { getProductById } from '../helpers/product';

interface ProductTypes {
  price: string
  name: string
  stock: string
  therapeutic_description: string
  expiration_date: string
  laboratory: any
  id?:string
}

export const ModalEditProduct = ({ productId,onCloseModal,handleClickNotification  }:any) => {
  // const productResponse = useGetProductByIdQuery(productId != null ? productId : skipToken)
  // const productResponse = useGetProductByIdQuery(productId)
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const dispatch = useAppDispatch()
  const { messageSaved } = useSelector((state:RootState)=>state.product)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: product as ProductTypes
  })
  const labotariesResponse = useGetLaboratoriesQuery({})
  
  const ref = useRef(true)

  // useEffect(() => {
  //   if (productResponse.isSuccess) {
  //     setProduct(productResponse.data?.data)
  //   }
  // }, [productResponse])

  useEffect(()=>{
    ref.current = true
    setProduct(null)
    getProductById(productId).then(response=>{
      if(ref.current) setProduct(response?.data)
    }).catch((err)=>{
      if(ref.current) console.log(err)
    })
    return () => {
      ref.current = false
    }
  },[productId])

  useEffect(()=>{
    if(!!messageSaved){
      onCloseModal()
    }
    // if(!!messageSaved) {
    // }
  },[messageSaved])

  const onEditProduct: SubmitHandler<ProductTypes> = (data) => {
    dispatch(startUpdatingProduct({...data,id:productId}))
    handleClickNotification()
  }

  return (
    product == null ? <Loader /> : <form onSubmit={handleSubmit(onEditProduct)}>
      <Grid container spacing={3}>
        <Grid item sx={{ display: "flex", gap: "1em", width: "100%" }} >
          <Typography variant="h4"><EditIcon />&nbsp;Editar Producto</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", gap: "1em", width: "100%" }}  >
        <TextField sx={{ flex: 1 }}
          label="ID"
          value={product.id}
          disabled
        />
        </Grid>
        <Grid item sx={{ display: "flex", gap: "1em", width: "100%" }}  >
          <Controller
            control={control}
            name="name"
            rules={{
              required: {
                value: true,
                message: "El nombre del producto es requerido"
              }
            }}
            defaultValue={product.name}
            render={({ field: { onChange, value } }) => (
              <TextField sx={{ flex: 1 }}
                label="Producto"
                onChange={onChange}
                value={value}
                helperText={errors.name?.message}
                error={!!errors.name}
              />
            )}
          />
          <Controller
            control={control}
            name="stock"
            rules={{
              required: {
                value: true,
                message: "El stock es necesario"
              },
              min:{
                value : 1,
                message  :"el valor minimo es 1"
              }
            }}
            defaultValue={product.stock}
            render={({ field: { onChange, value } }) => (
              <TextField sx={{ flex: 1 }}
              type="number"
              label="Stock"
              helperText={errors.stock?.message}
                error={!!errors.stock}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item sx={{ display: "flex", gap: "1em", width: "100%" }} >
          <Controller
            control={control}
            name="price"
            defaultValue={product.price}
            rules={{
              required: {
                value: true,
                message: "El stock es necesario"
              },
              min:{
                value : 10,
                message  :"el valor minimo es 10 soles"
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextField sx={{ flex: 1 }}
                label="Precio"
                InputProps={{
                  startAdornment: <InputAdornment position="start">S/</InputAdornment>,
                }}
                helperText={errors.price?.message}
                error={!!errors.price}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="therapeutic_description"
            defaultValue={product.therapeutic_description}
            rules={{
              required: {
                value: true,
                message: "El nombre del producto es requerido"
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextField sx={{ flex: 1 }}
                label="Desc. Terapeutica"
                helperText={errors.therapeutic_description?.message}
                error={!!errors.therapeutic_description}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item sx={{ display: "flex", gap: "1em", width: "100%" }} >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Controller
              control={control}
              name="expiration_date"

              defaultValue={product.expiration_date}
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
                defaultValue={product.laboratory}
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

          <Button type="submit" variant="contained" sx={{ background: "#068E9E", "&:hover": { background: "#068f9eac" } }}><SaveIcon />&nbsp;Guardar Cambios</Button>
        </Grid>
      </Grid>
    </form>
  )
}
