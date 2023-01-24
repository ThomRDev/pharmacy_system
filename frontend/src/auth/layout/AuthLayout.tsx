import { Grid } from "@mui/material"

interface IPropsAuthLayout {
  children ?: React.ReactNode
}

export const AuthLayout = ({ children }:IPropsAuthLayout) => {
  return (
    <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", backgroundColor: '#17191A', padding: "2em" }}
      >
        <Grid item
          className="box-shadow"
          xs={3}
          sx={{
            backgroundColor: "secondary.main", padding: "2em", borderRadius: "5px",
            border : "2px solid rgba(255,255,255,0.2)",
            width: {
              sm: 500
            },
            color:"white",
            display: "flex",
            flexDirection:"column",
            gap:"1em"
          }}
        >
          { children }
        </Grid>
      </Grid>
  )
}
