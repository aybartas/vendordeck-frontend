import { Fragment, useEffect, useState } from "react";
import { apiAgent } from "../../app/api/ApiService";

import { Product } from "../../app/models/product";
import ProductList from './ProductList';

export default function Catalog() {
  
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log("render will exec");
    apiAgent.Catalog.catalogList()
    .then(response =>  setProducts(response));
  }, []);
  console.log("catalog will return");
  return (
    <Fragment>
      <ProductList products = {products} ></ProductList>
    </Fragment>
  );
}
