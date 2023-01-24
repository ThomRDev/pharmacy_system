import GroupIcon from '@mui/icons-material/Group';
import BadgeIcon from '@mui/icons-material/Badge';
import InventoryIcon from '@mui/icons-material/Inventory';
import BiotechIcon from '@mui/icons-material/Biotech';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const navList = [
  {
    icon : HomeIcon,
    desc: "Home",
    path : "/",
    badge: 0,
  },
  {
    icon : BadgeIcon,
    desc: "Empleados",
    path : "/employees",
    badge: 0,
  },
  // {
  //   icon : GroupIcon,
  //   desc : "Clientes",
  //   path : "/customers",
  //   badge: 0,
  // },
  {
    icon : InventoryIcon,
    desc : "Inventario",
    path : "/inventory",
    badge: 0,
  },
  {
    icon : BiotechIcon,
    desc : "Laboratorios",
    path : "/laboratories",
    badge: 0,
  },
  // {
  //   icon : ShoppingCartIcon,
  //   desc : "Ventas",
  //   path : "/pucharses",
  //   badge: 0,

  // }
]