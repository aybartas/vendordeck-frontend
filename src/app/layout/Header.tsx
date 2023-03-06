import {
  AppBar,
  Toolbar,
  IconButton,
  Switch,
  List,
  ListItem,
  Badge,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStoreContext } from "../context/Context";

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

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  const { basket } = useStoreContext();

  const itemCount = basket?.basketItems.length;

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
          VendorDeck
        </Typography>
        <Switch onChange={handleThemeChange}></Switch>
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <List sx={{ display: "flex" }}>
          {rightLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: "inherit" }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
            <IconButton aria-label="cart"></IconButton>
          </IconButton>
        </List>
      </Toolbar>
    </AppBar>
  );
}
