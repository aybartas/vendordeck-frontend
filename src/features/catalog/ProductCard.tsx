import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiAgent } from "../../app/api/ApiService";
import { Product } from "../../app/models/product";
interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    console.log("beforeSetLoading true");
    setLoading(true);
    console.log(" after setLoading: true");
    apiAgent.Basket.addItem(productId)
      .catch((error) => console.log(error))
      .finally(() => {
        console.log(" before setloading false");
        setLoading(false);
        console.log("after setLoadingFalse");
      });
  }

  console.log("productCard will return");

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "" },
        }}
        avatar={<Avatar>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
      />
      <CardMedia
        component="img"
        height="140"
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.imageUrl}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small"
        >
          Add To Cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
