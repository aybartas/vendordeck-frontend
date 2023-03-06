import { Fragment, useEffect, useState } from "react";
import { apiAgent } from "../../api/ApiService";
import { Product } from "../../models/product";

import ProductList from "./ProductList";
import Loading from "../../layout/Loading";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  if (loading) return <Loading message="Loading products..."></Loading>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setLoading(true);
    apiAgent.Catalog.catalogList()
      .then((response) => {
        setProducts(response);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
