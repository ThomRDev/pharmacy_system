import axios from 'axios'

export const searchApi = axios.create({
  baseURL:'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params:{
    limit : 10,
    language : 'es',
    // types:'address%2Ccountry%2Cregion%2Cdistrict%2Cplace%2Clocality',
    types:'address,country,region,district,place,locality',
    contry:'pe',
    access_token : 'pk.eyJ1IjoidGhvbXJvbWFuIiwiYSI6ImNsN2kxbGF4cTAzMHo0MW5zZXlhcHZtc2QifQ.G7deqrqIn6bhADb2GXJNKQ'
  }
})