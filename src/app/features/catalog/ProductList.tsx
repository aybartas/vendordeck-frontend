import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../../models/entities/product";
import { useAppSelector } from "../../store/configureStore";
import ProductCardSkeleton from "./ProductSkeleton";

interface Props {
  products: Product[];
}
export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  return (
    <Grid container spacing={3}>
      {productsLoaded &&
        products.map((product, index) => (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <ProductCard {...product}></ProductCard>
          </Grid>
        ))}
      {!productsLoaded &&
        Array.from(Array(6)).map((_, i) => (
          <Grid item xs={12} sm={4} md={4} key={i}>
            <ProductCardSkeleton />
          </Grid>
        ))}
    </Grid>
  );
}
