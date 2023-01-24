import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './store'
import "./styles.css"

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbXJvbWFuIiwiYSI6ImNsN2kxbGF4cTAzMHo0MW5zZXlhcHZtc2QifQ.G7deqrqIn6bhADb2GXJNKQ';
if(!navigator.geolocation){
  alert( 'Tu navegador no tiene opción de Geolocation' );
  throw new Error('Tu navegador no tiene opción de Geolocation');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
)
