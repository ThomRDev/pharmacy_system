import {
  Alert,
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import BiotechIcon from "@mui/icons-material/Biotech";
import AddIcon from "@mui/icons-material/Add";
import { LaboratoryTable } from "../components/LaboratoryTable";
import { EditOutlined } from "@mui/icons-material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import moment from "moment";
import { useGetLaboratoriesQuery } from "../../store/apis/laboratoryApi";
import { useEffect, useState } from "react";
import { ModalCreateLaboratory } from "../components/ModalCreateLaboratory";
import { Loader } from "../components/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ModalEditLaboratory } from "../components/ModalEditLaboratory";


import { getLaboratories } from './../helpers/laboratory'

export const LaboratoryView = () => {
  const laboratoryResponse = useGetLaboratoriesQuery({});
  const [openNotification, setOpenNotification] = useState(false);
  const { messageSaved,error } = useSelector((state:RootState)=>state.laboratoryStore)
  const [laboratoryId, setLaboratoryId] = useState<string | null>(null);
  const [modalActive, setModalActive] = useState({
    edit: false,
    create: false,
  });

  const [laboratories,setLaboratories] = useState<any>(null)

  const [refetch,setRefetch] = useState<boolean>(false)

  useEffect(()=>{
    getLaboratories()
    .then(response=>{
      setLaboratories(response.data)
    })
  },[refetch])

  const [openModal, setOpenModal] = useState(false);
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    // laboratoryResponse.refetch();
    setRefetch(f=>!f)
    console.log('refetch');
    setOpenModal(false);
  };

  const handleClickNotification = () => {
    setOpenNotification(true);
  };
  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNotification(false);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "edit",
      headerName: "Editar",
      sortable: false,
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <IconButton
            sx={{
              background: "#097CEA",
              "&:hover": {
                background: "#097deaa9",
              },
            }}
            onClick={() => {
              setModalActive((modal:any)=>({ edit:true,create:false }))
              setLaboratoryId(params.row?.id)
              onOpenModal()
            }}
          >
            {" "}
            <EditOutlined sx={{ color: "white" }} />
          </IconButton>
        );
      },
    },
    {
      field: "description",
      headerName: "Descripcion",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: "Direccion",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "Fecha de creación",
      width: 210,
      headerAlign: "center",
      align: "center",
      valueGetter: (params: GridValueGetterParams) => {
        return moment(params.value).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
    {
      field: "updatedAt",
      headerName: "Fecha de actualizacion",
      width: 210,
      headerAlign: "center",
      align: "center",
      valueGetter: (params: GridValueGetterParams) => {
        return moment(params.value).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography
        variant="h3"
        mb={3}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <BiotechIcon sx={{ fontSize: "1.5em" }} />
        &nbsp;Laboratorios
      </Typography>
      { laboratoryResponse.isLoading ? <Loader /> : 
      <>
        <Grid container mb={2}>
          <Button
            variant="contained"
            sx={{
              background: "#068E9E",
              "&:hover": { background: "#068f9eac" },
            }}
            onClick={()=>{
              onOpenModal()
              setModalActive((modal:any)=>({ create:true,edit:false }))
            }}
          >
            <AddIcon />
            &nbsp;Agregar un nuevo laboratorio
          </Button>
        </Grid>
        <LaboratoryTable rows={laboratoryResponse.data?.data} columns={columns} />
      </>}
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
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "900px",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              background: "#17191A",
            }}
          >
            {
              modalActive.edit && 
              <ModalEditLaboratory 
                laboratoryId={laboratoryId as string} 
                onCloseModal={onCloseModal} 
                handleClickNotification={handleClickNotification} 
              />
            }
            {
              modalActive.create && 
              <ModalCreateLaboratory 
                onCloseModal={onCloseModal} 
                handleClickNotification={handleClickNotification} 
              />
            }
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
  );
};
