import { Container, CssBaseline, CircularProgress } from "@mui/material";
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
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
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../features/basket/basketSlice";
import Login from "../features/account/Login";
import Register from "../features/account/Register";
import { getCurrentUser } from "../features/account/AccountSlice";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
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
    // fetch current user
    // get basket
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      apiAgent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
