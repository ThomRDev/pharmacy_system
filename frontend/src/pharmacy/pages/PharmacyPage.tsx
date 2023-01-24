import { Box } from "@mui/material";
import {ReactNode, useState} from "react"
import { NavBar, SideBar } from "../components"
import { useTheme } from '@mui/material/styles';
interface PharmacyPageProps {
  children ?: ReactNode
}
const drawerWidthOpen = 280
const paddingIconButton = 10;
const marginIconButton = 14;
const iconFontSize = 20;
const drawerWidthClose = (paddingIconButton + marginIconButton) * 2 + iconFontSize;


export const PharmacyPage = ({ children }:PharmacyPageProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const toogleOpen = () => {
    setOpen(!open);
  }
  return (
    <div style={{ backgroundColor: '#17191A',width:"100%",minHeight:"100vh" }}>
      <SideBar drawerWidthOpen={drawerWidthOpen} open={open} toogleOpen={toogleOpen} drawerWidthClose={drawerWidthClose} />
      <Box sx={{
        marginLeft: !open?`${drawerWidthOpen}px`:`${drawerWidthClose}px`,
        padding: "1em",
        transition: theme.transitions.create('margin-left', {
          easing: theme.transitions.easing.sharp,
          duration: open
            ? theme.transitions.duration.leavingScreen
            : theme.transitions.duration.enteringScreen,
        }),
      }}>
        { children }
      </Box>
    </div>
  )
}
