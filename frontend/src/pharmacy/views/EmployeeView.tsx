import { Box } from "@mui/system"
import { Autocomplete, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { getAllEmployees } from "../helpers/employee";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { startCreatingNewEmployee } from "../../store/employee/thunks";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/lab";
interface Column {
  id: 'id' | 'createdAt' | 'updatedAt' | 'firstname' | 'lastname' | 'email' | 'age' | 'dni' | 'username' | 'role';
  label: string;
  minWidth?: number;
  align?: 'left' | 'right';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Identificador', minWidth: 170 },
  { id: 'firstname', align: 'left', label: 'FirstName', minWidth: 100 },
  { id: 'lastname', align: 'left', label: 'LastName', minWidth: 100 },
  { id: 'email', align: 'left', label: 'Email', minWidth: 100 },
  { id: 'age', align: 'left', label: 'Age', minWidth: 100 },
  { id: 'dni', align: 'left', label: 'DNI', minWidth: 100 },
  { id: 'username', align: 'left', label: 'Username', minWidth: 100 },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 170,
    align: 'left',
    format: (value: string) => moment(value).format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    id: 'updatedAt',
    label: 'UpdatedAt',
    minWidth: 170,
    align: 'left',
    format: (value: string) => moment(value).format('MMMM Do YYYY, h:mm:ss a')
  }
];

interface Data {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  dni: string;
  username: string;
  role: string;
}

type EmployeeTypes = {
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  dni: string;
  username: string;
  password: string
}

export const EmployeeView = () => {

  const [rows, setRows] = React.useState<Data[]>([])
  const [refetch, setRefecth] = React.useState<null | undefined | boolean>(null)
  const [openNotification, setOpenNotification] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { control, register, handleSubmit, formState: { errors },reset } = useForm<EmployeeTypes>()

  const { messageSaved, error } = useSelector((state: RootState) => state.employee)

  const dispatch = useAppDispatch()
  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNotification(false);
  };
  React.useEffect(() => {
    if (!!messageSaved) {
      setRefecth(!refetch)
    }
    // if(!!messageSaved) {
    // }
  }, [messageSaved])

  React.useEffect(() => {
    getAllEmployees().then((employees) => {
      // console.log();
      setRows(employees.data)
    })
  }, [refetch])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onCreateEmployee = (data: any) => {
    console.log(data);
    dispatch(startCreatingNewEmployee({
      ...data,
      age: +data.age,
      role: 'ADMIN'
    }))
    setOpenNotification(true)
    reset()
  }

  return (
    <>
      <Typography variant="h5" sx={{ mb: "1.5em" }} >Employees</Typography>
      <Box sx={{ backgroundColor: "#2D2F2E", borderRadius: "5px", p: "1em", width: "98%", mb: "1em" }}>
        <form style={{ display: "flex", flexDirection: "column", gap: "1em" }} onSubmit={handleSubmit(onCreateEmployee)} >
          <Grid container sx={{ gap: "1em", flexWrap: "wrap" }}>
            <TextField
              aria-label="txtFirstName"
              id="txtFirstName"
              label="First Name"
              variant="filled"
              autoComplete="false"
              {...register("firstname", {
                required: {
                  value: true,
                  message: "El FirstName es necesario"
                }
              })}
              helperText={errors.firstname?.message}
              error={!!errors.firstname}
            />
            <TextField
              aria-label="txtLastName"
              id="txtLastName"
              label="Last Name"
              variant="filled"
              autoComplete="false"
              {...register("lastname", {
                required: {
                  value: true,
                  message: "El Lastname es necesario"
                }
              })}
              helperText={errors.lastname?.message}
              error={!!errors.lastname}
            />
            <TextField
              aria-label="txtEmail"
              id="txtEmail"
              label="Email"
              variant="filled"
              autoComplete="false"
              {...register("email", {
                required: "El email es necesario",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "No es un Email valido"
                }
              })}
              type="email"
              helperText={errors.email?.message}
              error={!!errors.email}
            />
            <TextField
              aria-label="txtEdad"
              id="txtEdad"
              label="Edad"
              variant="filled"
              autoComplete="false"
              type={'number'}
              {...register("age", {
                required: "La edad es necesaria",
                min: {
                  value: 18,
                  message: 'El empleado debe ser mayor a 17'
                },
                max: {
                  value: 70,
                  message: 'El empleado debe ser menor a 70'
                }
              })}
              helperText={errors.age?.message}
              error={!!errors.age}
            />
            <TextField
              aria-label="txtDni"
              id="txtDni"
              label="DNI"
              variant="filled"
              autoComplete="false"
              {...register("dni", {
                required: "El dni es necesario",
                minLength: {
                  value: 8,
                  message: 'Debe de tener 8 caracteres'
                },
                maxLength: {
                  value: 8,
                  message: 'Debe de tener 8 caracteres'
                }
              })}
              helperText={errors.dni?.message}
              error={!!errors.dni}
            />
            <TextField
              aria-label="txtUsername"
              id="txtUsername"
              label="Username"
              variant="filled"
              autoComplete="false"
              {...register("username", {
                required: {
                  value: true,
                  message: "El username es necesario"
                },
                minLength: {
                  value: 5,
                  message: "El username debe de tener 5 caracteres como mínimo"
                },
              })}
              helperText={errors.username?.message}
              error={!!errors.username}
            />
            <TextField
              aria-label="txtPassword"
              id="txtPassword"
              label="Password"
              variant="filled"
              autoComplete="false"
              type="password"
              inputProps={{
                "aria-label": 'password'
              }}
              placeholder="***********"

              {...register("password", {
                required: {
                  value: true,
                  message: "El password es necesario"
                },
                minLength: {
                  value: 5,
                  message: "El password debe de tener 5 caracteres como mínimo"
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid container>
            <Button
              aria-label="btn-save"
              id="btn-save"
              type="submit" variant="contained" sx={{ background: "#068E9E", "&:hover": { background: "#068f9eac" } }}><SaveIcon />&nbsp;Guardar empleado</Button>
          </Grid>
        </form>
      </Box>
      <Paper sx={{ width: '95%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'string'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {
        !!messageSaved && <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleCloseNotification}>
          <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>{messageSaved}</Alert>
        </Snackbar>
      }
      {
        !!error && <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleCloseNotification}>
          <Alert onClose={handleCloseNotification} severity="error" sx={{ width: '100%' }}>{error}</Alert>
        </Snackbar>
      }
    </>
  )
}
