import { Badge, Box, Button, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "./../../assets/logo_optimized.svg"
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import StyledAvatar from './StyledAvatar';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { startLogout } from '../../store/auth';
import { navList } from '../utils/navList';
import { NavLink } from 'react-router-dom';


interface SideBarProps {
  drawerWidthOpen : number,drawerWidthClose : number ,open : boolean,toogleOpen : any
}


export const SideBar = ({ drawerWidthOpen,drawerWidthClose,open,toogleOpen }:SideBarProps) => {
  const theme = useTheme();
  const { fullname,role } = useSelector((state:RootState) => state.auth)

  const dispatch = useAppDispatch()

  

  const onLogout = () => {
    dispatch(startLogout())
  }

  const drawerContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '42px',
          width: 'auto',
          backgroundColor: 'transparent',
          margin: '14px 14px',
          padding: '12px 0px',
          borderBottom: '1px solid lightgray',
          alignItems: 'flex-end',
          marginTop:"1.5em"
        }}
      >
        <Box
          sx={{
            display: open ? 'none' : { xs: 'none', sm: 'flex' },
            alignItems:"center"
          }}
        >
          {/* <Logo /> */}
          <img src={Logo} alt="React Logo" width={40} height={40} />
        </Box>
        <Typography
          variant="h1"
          noWrap={true}
          gutterBottom
          sx={{
            display: { xs: 'none', sm: 'initial' },
            fontSize: '18px',
            fontWeight: 600,
            color: 'lightgray',
            width: '154px',
            marginLeft: open ? '0px' : '8px',
            paddingBottom: '3px',
          }}
        >
          FarmaciaApp
        </Typography>
          
        <Button
          onClick={toogleOpen}
          sx={{
            minWidth: 'initial',
            padding: '10px',
            color: 'gray',
            borderRadius: '8px',
            backgroundColor: open ? 'transparent' : 'transparent',
            '&:hover': {
              backgroundColor: '#26284687',
            },
          }}
        >
          <MenuIcon
            sx={{ fontSize: '20px', color: open ? 'lightgray' : 'lightGray' }}
          ></MenuIcon>
        </Button>
      </Box>

      <List dense={true} sx={{ marginTop :"1em" }}>
        {
          navList.map((item)=>{
            return <Tooltip
            title={open ? item.desc : ""}
            key={item.desc}
            placement={"right"}
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: "gray",
                  color: "white",
                  marginLeft: "22px !important",
                  boxShadow: "0px 0px 22px -2px rgba(0,0,0,0.20)"
                }
              }
            }}
          >
            <NavLink to={item.path} className={({isActive}) => (isActive ? ' active': '')}>
            <ListItemButton
                  sx={{
                    margin: "6px 14px",
                    padding: "10px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#26284687"
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "46px" }}>
                    <Badge
                      badgeContent={item.badge}
                      color="secondary"
                      variant="dot"
                    >
                      <item.icon sx={{ fontSize: "20px", color: "lightgray" }} />
                    </Badge>
                  </ListItemIcon>
                    <ListItemText
                      primary={item.desc}
                      primaryTypographyProps={{
                        variant: "body2"
                      }}
                      sx={{
                        display: "inline",
                        margin: "0px",
                        overflowX: "hidden",
                        color: "lightgray",
                        whiteSpace: "nowrap",
                        minWidth: "126px"
                      }}
                    />
                </ListItemButton>
              </NavLink>
          </Tooltip>
          })
        }
      </List>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          alignContents: "center",
          margin: "14px 14px",
          padding: "12px 4px",
          borderTop: "1px solid lightgray",
          marginTop:"auto"
        }}
      >
        <Box
          sx={{
            display: "flex",
            marginRight: "18px",
            paddingLeft: "0px",
            alignItems: "center",
            alignContent: "center"
          }}
        >
          <StyledAvatar letter={(fullname as string)[0]} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Typography
            component="span"
            variant="body2"
            sx={{
              fontFamily: "inherit",
              display: "block",
              whiteSpace: "nowrap",
              lineHeight: "inherit",
              fontWeight: 500,
              color: "lightgray"
            }}
          >
            { fullname }
          </Typography>
          <Typography
            component="span"
            variant="body2"
            sx={{
              display: "block",
              whiteSpace: "nowrap",
              lineHeight: "inherit",
              color: "lightgray"
            }}
          >
            { role }
          </Typography>
        </Box>
        <IconButton color="error"  onClick={onLogout}>
          <ExitToAppIcon />
        </IconButton>
      </Box>
    </>
  )

  return (
    <Box
    display={"flex"}
    component={"nav"} 
    sx={{
      position: "fixed",
      width: open
            ? { xs: '0px', sm: drawerWidthClose }
            : { xs: drawerWidthClose, sm: drawerWidthOpen },
      height: "100vh"
    }}
    >
<Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open
            ? { xs: '0px', sm: drawerWidthClose }
            : { xs: drawerWidthClose, sm: drawerWidthOpen },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.leavingScreen
              : theme.transitions.duration.enteringScreen,
          }),
          '& .MuiDrawer-paper': {
            // justifyContent: 'space-between',
            overflowX: 'hidden',
            width: open
              ? { xs: '0px', sm: drawerWidthClose }
              : { xs: drawerWidthClose, sm: drawerWidthOpen },
            borderRight: '0px',
            boxShadow: theme.shadows[8],
            backgroundColor: open ? '#1C1F1E' : '#1C1F1E',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >{ drawerContent }</Drawer>
    </Box>
  )
}
