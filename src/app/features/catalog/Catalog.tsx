import { Fragment, useEffect, useState } from "react";
import { apiAgent } from "../../api/ApiService";
import { Product } from "../../models/product";

import ProductList from "./ProductList";
import React from "react";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    apiAgent.Catalog.catalogList().then((response) => setProducts(response));
  }, []);

  return (
    <Fragment>
      <ProductList products={products}></ProductList>
    </Fragment>
  );
}
