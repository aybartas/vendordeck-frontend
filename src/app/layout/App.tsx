import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ContactPage } from "@mui/icons-material";
import AboutPage from "../features/about/AboutPage";
import BasketPage from "../features/basket/BasketPage";
import Catalog from "../features/catalog/Catalog";
import ProductDetail from "../features/catalog/ProductDetail";
import HomePage from "../features/home/HomePage";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteSelection = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteSelection,
      background: {
        default: paletteSelection === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  console.log("app will render");
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/catalog" component={Catalog} />
            <Route path="/catalog/:id" component={ProductDetail} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/basket" component={BasketPage} />

          </Switch>
        </Container>
    </ThemeProvider>
  );
}

export default App;
