import React, { useState, useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ChartData
} from 'chart.js';

import { Line ,Bar } from 'react-chartjs-2';
import { getAllProducts, getMostSelledProducts } from '../helpers/product';
import { Box, Grid, Typography } from '@mui/material';
import { Resume } from '../components/Resume';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export const HomeView = () => {
  const [chartRe, setChartRe] = useState<any>(null)
  const [ chartMost,setChartMost] = useState<any>(null)

  const ref = useRef(true)

  useEffect(()=>{

    ref.current = true
    
    setChartRe(null)
    getAllProducts()
    .then(products=>{
      if(ref.current){
        setChartRe(products.data)
      }
    })

    getMostSelledProducts()
    .then(products=>{
      if(ref.current){
        setChartMost(products.data)
      }
    })

    return () => {
      ref.current = false
    }
  },[])

  var dataReg: ChartData<"bar", any, unknown> = {
    labels: chartRe?.map((product:any) => product.name),
    
    datasets: [{
      label: `Productos Registrados`,
      
      data: chartRe?.map((product:any) => product.stock),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  }
  var dataMost = {
    labels: chartMost?.map((product:any) => product.name),
    datasets: [{
      label: `Vendido`,
      data: chartMost?.map((product:any) => product.vendido),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  }

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <Grid container sx={{ width:"100%" }}>
      <Resume />
      <Grid container justifyContent={"center"} sx={{ gap:3 }} >
        <Box sx={{
          width: "600px",
          height: "600px",
          // boxShadow: "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12)",
          border:"4px solid rgba(255,255,255,0.1)",
          borderRadius:"10px",
          overflow: "hidden",
          display:"flex",
          flexDirection:"column"
        }}>
          <Box sx={{backgroundColor :"#1C1F1E",padding :"1em",textAlign:"center" }}>
            <Typography variant='h5'>Productos Registrados</Typography>
          </Box>
          <Box sx={{ flex:"1",padding :"2em" }}>
            <Bar
              data={dataReg}
              height={100}
              options={options}
              aria-label='canvas-registrados'
            />
          </Box>
        </Box>
        <Box sx={{
          width: "600px",
          height: "600px",
          // boxShadow: "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12)",
          border:"4px solid rgba(255,255,255,0.1)",
          borderRadius:"10px",
          overflow: "hidden",
          display:"flex",
          flexDirection:"column"
        }}>
          <Box sx={{backgroundColor :"#1C1F1E",padding :"1em",textAlign:"center" }}>
            <Typography variant='h5'>Productos mas vendidos</Typography>
          </Box>
          <Box sx={{ flex:"1",padding :"2em" }}>
            <Line
              data={dataMost}
              height={100}
              
              options={options}
              aria-label='canvas-mas-vendido'
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
