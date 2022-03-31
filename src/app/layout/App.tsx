import { Container, CssBaseline} from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useState } from 'react';


function App() {

  const [darkMode,setDarkMode] = useState(false);
  const paletteSelection = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode : paletteSelection,
      background : {
        default : paletteSelection === 'light' ? '#eaeaea': '#121212'
      }
    }
  })

  function handleThemeChange(){
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode = {darkMode} handleThemeChange = {handleThemeChange}/>
      <Container>
      <Catalog></Catalog>

      </Container>
    </ThemeProvider>
  );
}

export default App;
