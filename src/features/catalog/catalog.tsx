import { Fragment } from "react";
import { Product } from "../../app/models/product";
import ProductList from './ProductList';

interface Props {
    products: Product [];
    addProduct:() => void;
}

export default function Catalog({products,addProduct}: Props) {
  return (
    <Fragment>
      <h1>Catalog</h1>
      <ProductList products = {products} ></ProductList>
    </Fragment>
  );
}
