import { Container, CssBaseline } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import HomePage from "../../features/home/HomePage";
import AboutPage from "./../../features/about/AboutPage";
import ProductDetail from "../../features/catalog/ProductDetail";
import ContactPage from "../../features/contact/ContactPage";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right">
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/catalog" component={Catalog} />
            <Route path="/catalog/:id" component={ProductDetail} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
          </Switch>
        </Container>
      </ToastContainer>
    </ThemeProvider>
  );
}

export default App;
