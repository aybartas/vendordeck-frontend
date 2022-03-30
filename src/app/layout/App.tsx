import { Container, CssBaseline, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../models/product";
import Header from "./Header";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: 1,
        name: "asd",
        price: 50,
        brand: "asdfds",
        description: "sdfg",
        imageUrl: "fafsfdsdf/fdgdfg",
      },
    ]);
  }

  return (
    <>
      <CssBaseline />
      <Header/>
      <Container>
      <Catalog products={products} addProduct={addProduct}></Catalog>

      </Container>
    </>
  );
}

export default App;
