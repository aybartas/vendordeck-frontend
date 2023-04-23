import { Grid } from "@mui/material";
import { Product } from "../../models/product";
import ProductCard from "./ProductCard";
import React from "react";

interface Props {
  products: Product[];
}
export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={3}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <ProductCard {...product}></ProductCard>
        </Grid>
      ))}
    </Grid>
  );
}
