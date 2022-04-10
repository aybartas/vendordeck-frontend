import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Switch,
  List,
  ListItem,
  Badge,
} from "@mui/material";

import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}
const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];
const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles= { 
  color: "inherit" , 
  textDecoration : 'none',
  typography : 'h6',
  '&:hover' : {
    color: 'grey.500'
  },
  '&.active': {
    color:'text.secondary'
  }
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{display: 'flex', justifyContent : 'space-between'}}>
        <Typography variant="h6" component={NavLink}
         exact 
         to="/" 
         sx={navStyles}>
          VendorDeck
        </Typography>
        <Switch onChange={handleThemeChange}></Switch>


        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path} 
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <List sx={{ display: "flex" }}>
          {rightLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
            
          ))}
           <IconButton size="large" sx={{ color: "inherit" }}>
          <Badge badgeContent={3} color="secondary">
            <ShoppingCartIcon />
          </Badge>
          <IconButton aria-label="cart"></IconButton>
        </IconButton>
        </List>
       
      </Toolbar>
    </AppBar>
  );
}
