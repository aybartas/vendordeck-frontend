import { Container, CssBaseline, CircularProgress } from '@mui/material';
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ContactPage } from "@mui/icons-material";
import AboutPage from "../features/about/AboutPage";
import BasketPage from "../features/basket/BasketPage";
import Catalog from "../features/catalog/Catalog";
import ProductDetail from "../features/catalog/ProductDetail";
import HomePage from "../features/home/HomePage";
import { useStoreContext } from '../context/Context';
import { getCookie } from "../utils/cookiesUtils";
import { apiAgent } from '../api/ApiService';
import CheckoutPage from '../features/checkout/CheckoutPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading,setLoading] = useState(false);
  const {setBasket} = useStoreContext();

  const paletteSelection = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteSelection,
      background: {
        default: paletteSelection === "light" ? "#eaeaea" : "#121212",
      },
    },
  });
  
  // use setBasket as dependency so the useEffect hook will be triggered only after setting basket
  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if(buyerId){
      apiAgent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    }
    else{
      setLoading(false);
    }

  },[setBasket]);

  if(loading) return (<CircularProgress />);

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
            <Route path="/checkout" component={CheckoutPage} />            
          </Switch>
        </Container>
    </ThemeProvider>
  );
}

export default App;
