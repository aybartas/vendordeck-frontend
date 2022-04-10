import { Fragment, useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from './ProductList';

export default function Catalog() {
  
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log("render will exec");
    fetch("http://localhost:5050/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  console.log("catalog will return");
  return (
    <Fragment>
      <ProductList products = {products} ></ProductList>
    </Fragment>
  );
}
