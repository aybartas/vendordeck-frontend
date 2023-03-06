import { Container, CssBaseline, CircularProgress } from "@mui/material";
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/Context";
import { getCookie } from "../utils/cookiesUtils";
import { apiAgent } from "../api/ApiService";
import HomePage from "../features/home/HomePage";
import Catalog from "../features/catalog/Catalog";
import ProductDetail from "../features/catalog/ProductDetail";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";
import BasketPage from "../features/basket/BasketPage";
import CheckoutPage from "../features/checkout/CheckoutPage";
import { ToastContainer } from "react-toastify";
import React from "react";
import ServerError from "../errors/ServerError";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  const paletteSelection = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteSelection,
      background: {
        default: paletteSelection === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      apiAgent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);

  if (loading) return <CircularProgress />;

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/server-error" element={<ServerError />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
