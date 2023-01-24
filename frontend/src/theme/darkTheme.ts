import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette :{
    mode :"dark",
    primary : {
      main  : "#8E8F8F"
      // main  : "#17191A"sa
    },
    secondary : {
      main  : "#1C1F1E"
    },
    error :{
      main : red.A400
    },
  },
  components:{
    MuiTextField:{
      styleOverrides:{
        root:{

        }
      }
    }
  }
})