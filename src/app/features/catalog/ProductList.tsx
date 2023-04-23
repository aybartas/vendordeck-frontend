import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../../models/entities/product";

interface Props {
  products: Product[];
}
export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={3}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={4} md={4} key={index}>
          <ProductCard {...product}></ProductCard>
        </Grid>
      ))}
    </Grid>
  );
}
