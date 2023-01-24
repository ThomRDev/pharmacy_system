
import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState,ChangeEvent } from 'react'
import { getLaboratoryById } from '../helpers/laboratory'
import { Loader } from './Loader'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { searchApi } from '../../apis/SearchApi';
import { useMapBox } from '../hooks/useMapBox';
import CircularProgress from '@mui/material/CircularProgress';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store';
import { startUpdatingLaboratory } from '../../store/laboratory/thunks';
const initialCoords = {
  lng: -77.0428,
  lat: -12.0464,
  zoom: 9,
}
export const ModalEditLaboratory = ({ laboratoryId,onCloseModal,handleClickNotification  }:any) => {
  
  const [laboratory,setLaboratory] = useState<any>()
  const dispatch = useAppDispatch()
  const ref = useRef(true)

  useEffect(()=>{
    ref.current = true
    setLaboratory(null)
    getLaboratoryById(laboratoryId).then(response=>{
      if(ref.current) setLaboratory(response?.data)
    }).catch((err)=>{
      if(ref.current) console.log(err)
    })
    return () => {
      ref.current = false
    }
  },[laboratoryId])

  

  const [places, setPlaces] = useState<any>([])
  const debounceRef = useRef<NodeJS.Timeout>()

  const [openResults, setOpenResults] = useState(false)

  const loadingPlaces = openResults && places.length === 0
  const getDataFromAPI = async (query: string) => {
    setOpenResults(true)
    const resp = await searchApi.get<any>(`/${query}.json`, {
      params: {
        proximity: [initialCoords.lng, initialCoords.lat].join(','),
      },
    })
    setPlaces(resp.data.features)
  }
  const { control, handleSubmit, formState: { errors } } = useForm<any>({
    defaultValues: laboratory
  })
  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      getDataFromAPI(event.target.value)
    }, 1000)
  }

  const { setRef, addMarker,markersef,map } = useMapBox(initialCoords,!!laboratory)
  useEffect(()=>{
    if(!laboratory) return
    if(!map) return
    addMarker({ center : [laboratory.lng, laboratory.lat],text_es : laboratory.description,place_name_es:laboratory.address })
  },[laboratory,map])
  const onEditLaboratory: SubmitHandler<any>  = (values) => {
    console.log('modal',values)
    dispatch(startUpdatingLaboratory({
      name : values.name,
      description:values.description,
      address : values.address.place_name_es,
      id:laboratoryId,
      lat : markersef.current?.getLngLat().lat,
      lng : markersef.current?.getLngLat().lng
    }))
    handleClickNotification()
    onCloseModal()
  }
  if(!laboratory) return <Loader />
  return (
  <form autoComplete="off" onSubmit={handleSubmit(onEditLaboratory)}>
    <Grid container spacing={3}>
      <Grid item sx={{ display: 'flex', gap: '1em', width: '100%' }}>
        <Typography variant="h4">
          <EditIcon />
          &nbsp;Editar Laboratorio
        </Typography>
      </Grid>
      <Grid
        item
        sx={{ display: 'flex', gap: '1em', width: '100%', flexWrap: 'wrap' }}
      >
        <Grid
          item
          width={'40%'}
          flexShrink={0}
          display="flex"
          flexDirection={'column'}
          gap="1em"
        >
          <TextField
            label="Id"
            value={laboratory?.id}
            disabled
          />
          <Controller
            control={control}
            name="name"
            rules={{
              required: {
                value: true,
                message: "El nombre del laboratorio es requerido"
              }
            }}
            defaultValue={laboratory?.name}
            render={({ field: { onChange, value } }) => (
              <TextField 
                label="Nombre"
                onChange={onChange}
                value={value}
                helperText={errors.name?.message as any}
                error={!!errors.name}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            defaultValue={{ place_name_es : laboratory.address }}
            render={({ field: { ref, onChange, ...field } }) => (
              <Autocomplete
                fullWidth
                open={openResults}
                onClose={() => {
                  setOpenResults(false)
                }}
                onOpen={() => {
                  setOpenResults(true)
                }}
                isOptionEqualToValue={(option, value) =>
                  option.place_name_es === value.place_name_es
                }
                getOptionLabel={(option: any) => option.place_name_es}
                options={places}
                defaultValue={{ place_name_es : laboratory.address }}
                loading={loadingPlaces}
                onChange={(_, data) => {
                  onChange(data)
                  addMarker(data)
                }}
                renderInput={(params) =>{
                  // console.log('params',params)
                  return (
                    <TextField
                      {...field}
                      {...params}
                      fullWidth={true}
                      label="direccion"
                      onChange={onQueryChanged}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingPlaces ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )
                }}
              />
            )}
            
          />
          <Controller
            control={control}
            name="description"
            defaultValue={laboratory?.description}
            render={({ field: { onChange, value } }) => (
              <TextField
                type={'text'}
                variant="outlined"
                fullWidth
                multiline
                label="Descripcion"
                rows={5}
                autoComplete={'off'}
                value={value}
                onChange={onChange}
              />
            )}
          />
          
        </Grid>
        <Grid item flex={1} flexShrink={0} height="500px">
          <div
            ref={setRef}
            style={{ width: '100%', height: '100%', background: '#ccc' }}
          />
        </Grid>
      </Grid>
      <Grid item sx={{ display: 'flex', gap: '1em', width: '100%' }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            background: '#068E9E',
            '&:hover': { background: '#068f9eac' },
          }}
        >
          <SaveIcon />
          &nbsp;Guardar Cambios
        </Button>
      </Grid>
    </Grid>
  </form>
  )
}
