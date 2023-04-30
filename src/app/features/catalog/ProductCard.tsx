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
import { Link } from "react-router-dom";
import displayCalculatedCurrency from "../../utils/caculations";

import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";
import { Product } from "../../models/entities/product";

export default function ProductCard({
  name,
  imageUrl,
  price,
  brand,
  type,
  id,
}: Product) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.basket);

  const isLoading = status.includes("pendingAddItem" + id);

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "" },
        }}
        avatar={<Avatar>{name?.charAt(0)?.toUpperCase()}</Avatar>}
        title={name}
      />
      <CardMedia
        component="img"
        height="140"
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {displayCalculatedCurrency(price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brand} / {type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={isLoading}
          onClick={() => dispatch(addBasketItemAsync({ productId: id }))}
          size="small"
        >
          Add To Cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
