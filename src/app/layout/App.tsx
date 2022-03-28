import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/catalog";
import { Product } from '../models/product';

function App() {

  const [products, setProducts] = useState<Product []>([]);
  
  useEffect(() => {
    fetch('http://localhost:5050/api/products')
    .then(response => response.json())
    .then(data =>setProducts(data))
  }, []);

  function addProduct(){
    setProducts(prevState => [...prevState,{
      id : 1,
      name: 'asd',
      price : 50,
      brand: 'asdfds',
      description : 'sdfg',
      imageUrl : 'fafsfdsdf/fdgdfg'
    } ])
  }
  
  return (
    <div className="App">
      <Typography>VendorDeck App</Typography>
      <Catalog products = {products} addProduct = {addProduct} ></Catalog>
      <ul>
        {products.map((product,index) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
