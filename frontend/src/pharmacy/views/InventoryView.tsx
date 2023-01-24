import { useGetProductsQuery } from "../../store/apis/invetoryApi"
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Alert, Backdrop, Box, Button, Fade, Grid, IconButton, Modal , Snackbar, Typography } from "@mui/material";
import moment from "moment"
import { EditOutlined } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import StoreIcon from '@mui/icons-material/Store';

import { Loader } from "../components/Loader";
import { ModalEditProduct } from "../components/ModalEditProduct";
import { modal_style } from "../utils";
import { InvetoryTable } from "../components/InvetoryTable";
import { useState } from "react";
import { ModalCreateProduct } from "../components/ModalCreateProduct";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { clearProduct } from "../../store/inventory/inventorySlice";

export const InventoryView = () => {
  const [openNotification, setOpenNotification] = useState(false);
  const { messageSaved,isSaving,error } = useSelector((state:RootState)=>state.product)

  const dispatch = useAppDispatch()

  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNotification(false);
  };

  const handleClickNotification = () => {
    setOpenNotification(true);
  };

  const productsResponse = useGetProductsQuery({})
  const [productId,setProductId] = useState<string | null>(null)
  const [modalActive,setModalActive] = useState({
    edit : false,
    create:false
  })

  const [openModal, setOpenModal] = useState(false);
  const onOpenModal = () => {
    dispatch(clearProduct())
    setOpenModal(true)
  }
  const onCloseModal = () => {
    productsResponse.refetch()
    setOpenModal(false)
  };


  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Producto', width: 110, headerAlign: "center", align: "center" },
    {
      field: 'edit', headerName: 'Editar',
      sortable: false, width: 80, headerAlign: "center", align: "center", renderCell: (params) => {
        return <IconButton sx={{
          background: "#097CEA",
          "&:hover": {
            background: "#097deaa9",
          }
        }}
          onClick={() => {
            setModalActive((modal:any)=>({ edit:true,create:false }))
            setProductId(params.row?.id)
            onOpenModal()
          }
          }
        > <EditOutlined sx={{ color: "white" }} /></IconButton>
      }
    },
    { field: 'therapeutic_description', headerName: 'Desc. Terapeutica', width: 230, headerAlign: "center", align: "center" },
    {
      field: 'price',
      headerName: 'Precio',
      type: 'number',
      width: 100,
      headerAlign: "center", align: "center",
      valueGetter: (params: GridValueGetterParams) => {
        return `s/ ${params.value}.00`;
      }
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 80,
      headerAlign: "center", align: "center",
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.value} u`;
      }
    },
    {
      field: "createdAt", headerName: "Fecha de creación", width: 210, headerAlign: "center", align: "center",
      valueGetter: (params: GridValueGetterParams) => {
        return moment(params.value).format('MMMM Do YYYY, h:mm:ss a');
      }
    },
    {
      field: "expiration_date", headerName: "Fecha de expiracion", width: 210, headerAlign: "center", align: "center",
      valueGetter: (params: GridValueGetterParams) => {
        return moment(params.value).format('MMMM Do YYYY, h:mm:ss a');
      }
    },
    {
      field: "updatedAt", headerName: "Fecha de actualizacion", width: 210, headerAlign: "center", align: "center",
      valueGetter: (params: GridValueGetterParams) => {
        return moment(params.value).format('MMMM Do YYYY, h:mm:ss a');
      }
    },
    {
      field: "laboratory", headerName: "Laboratorio", width: 180, headerAlign: "center", align: "center",
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.value?.name}`
      }
    }
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <Typography variant="h3" mb={3} sx={{ display: "flex", alignItems: "center" }}><StoreIcon sx={{ fontSize: "1.5em" }} />&nbsp;Inventario de Productos</Typography>
      { productsResponse.isLoading ? <Loader /> : <>
        <Grid container mb={2} >
          <Button
          aria-label="btn-add-product" 
          id="btn-add-product"
          onClick={()=>{
            onOpenModal()
            setModalActive((modal:any)=>({ create:true,edit:false }))
          }}
          variant="contained" sx={{ background: "#068E9E", "&:hover": { background: "#068f9eac" } }}><AddCircleIcon />&nbsp;Agregar Nuevo producto</Button>
        </Grid>
        <InvetoryTable rows={productsResponse.data?.data} columns={columns} />
      </> }
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={onCloseModal}
        sx={{ background: "rgba(0,0,0,0.8)" }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        
      >
        <Fade in={openModal}>
          <Box sx={modal_style}>
            { modalActive.edit && <ModalEditProduct productId={productId as string} onCloseModal={onCloseModal} handleClickNotification={handleClickNotification} /> }
            { modalActive.create && <ModalCreateProduct onCloseModal={onCloseModal} handleClickNotification={handleClickNotification} /> }
            {/* // <ModalEditProduct {...productResponse.data?.data} /> } */}
          </Box>
        </Fade>
      </Modal>

      {
        !!messageSaved &&  <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleCloseNotification}>
          <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>{ messageSaved }</Alert>
        </Snackbar>
      }
      {
        !!error &&  <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity="error" sx={{ width: '100%' }}>{ error }</Alert>
      </Snackbar>
      }
    </div>
  )
}
