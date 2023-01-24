import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./darkTheme";

interface AppThemeProps {
  children ?: React.ReactNode; 
}
export const AppTheme = ({ children }:AppThemeProps) => {
  return (
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}
