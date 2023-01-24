import { CircularProgress, Grid } from "@mui/material"

export const CheckingAuth = () => {
  return (
    <Grid container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight:"100vh", backgroundColor: '#17191A',padding:"2em" }}
    >
      <Grid item
        xs={3}
        sx={{ padding:"2em",borderRadius : 2, width : { sm: 500 } }}
        display={"flex"}
        alignItems="center"
        justifyContent="center"
        >
        <CircularProgress color="warning" size={60} />
      </Grid>
    </Grid>
  )
}