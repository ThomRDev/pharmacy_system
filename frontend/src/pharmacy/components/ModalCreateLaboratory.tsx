import { Button, Grid, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import SaveIcon from '@mui/icons-material/Save'
import { useLayoutEffect, useRef, useState, ChangeEvent, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { useMapBox } from '../hooks/useMapBox'
import { Autocomplete } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { searchApi } from '../../apis/SearchApi'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { startCreatingNewLaboratory } from '../../store/laboratory/thunks'

const initialCoords = {
  lng: -77.0428,
  lat: -12.0464,
  zoom: 9,
}

type LaboratoryTypes = {
  description:string
  address:string
  name : string
}

export const ModalCreateLaboratory = ({
  onCloseModal,
  handleClickNotification,
}: any) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LaboratoryTypes>()
  const [places, setPlaces] = useState<any>([])
  const debounceRef = useRef<NodeJS.Timeout>()

  const [openResults, setOpenResults] = useState(false)

  const loadingPlaces = openResults && places.length === 0
  const getDataFromAPI = async (query: string) => {
    console.log('Options Fetched from API')
    setOpenResults(true)
    const resp = await searchApi.get<any>(`/${query}.json`, {
      params: {
        proximity: [initialCoords.lng, initialCoords.lat].join(','),
      },
    })
    setPlaces(resp.data.features)
  }

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      getDataFromAPI(event.target.value)
    }, 1000)
  }
  // const { messageSaved} = useSelector((state:RootState)=>state.laboratoryStore)

  const dispatch = useAppDispatch()
  const { setRef, addMarker,markersef } = useMapBox(initialCoords)
  const onSaveLaboratory: SubmitHandler<LaboratoryTypes> = (data)=> {
    console.log(data);
    console.log(markersef.current!.getLngLat());
    const payload = {
      ...data,
      ...markersef.current!.getLngLat()
    }
    console.log(payload);
    dispatch(startCreatingNewLaboratory(payload))
    handleClickNotification()
    onCloseModal()
  }

  // useEffect(()=>{
  //   if(!!messageSaved){
  //   }
  // },[messageSaved])

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSaveLaboratory)}>
      <Grid container spacing={3}>
        <Grid item sx={{ display: 'flex', gap: '1em', width: '100%' }}>
          <Typography variant="h4">
            <MedicalServicesIcon />
            &nbsp;Agregar Nuevo Laboratorio
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
              sx={{}}
              autoComplete={'off'}
              {...register("name", {
                required: {
                  value: true,
                  message: "El nombre del laboratorio es necesario"
                }

              })}
              label="Nombre"
              helperText={errors.name?.message}
              error={!!errors.name}
            />
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
              onChange={(e, place) => addMarker(place)}
              getOptionLabel={(option: any) => option.place_name_es}
              options={places}
              loading={loadingPlaces}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="direccion"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "La direccion es necesario"
                    }
                  })}
                  helperText={errors.address?.message}
                  error={!!errors.address}
                  // label="Asynchronous"
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
              )}
            />
            <TextField
              type={'text'}
              variant="outlined"
              fullWidth
              multiline
              label="Descripcion"
              rows={5}
              autoComplete={'off'}
              {...register("description")}
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
