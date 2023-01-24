import { DataGrid, GridDensityTypes, GridToolbar } from "@mui/x-data-grid"

export const InvetoryTable = ({ columns, rows }: any) => {
  return (
    <>
      <DataGrid
        sx={{ height: 500 }}
        rows={rows}
        columns={columns}
        pageSize={5}
        density={GridDensityTypes.Comfortable}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
        aria-label="tabla-productos"
      // checkboxSelection
      />
    </>
  )
}
