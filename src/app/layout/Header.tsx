import { AppBar, Toolbar, IconButton, Typography, Button, Switch } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

interface Props{
  darkMode : boolean;
  handleThemeChange: () => void;
}
export default function Header({darkMode, handleThemeChange}:Props){
    return (
        <AppBar position="static" sx = {{mb:4}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VendorDeck
          </Typography>
          <Switch onChange={handleThemeChange}></Switch>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
}