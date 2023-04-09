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
import { Product } from "../../models/product";
import { apiAgent } from "../../api/ApiService";
import displayCalculatedCurrency from "../../utils/caculations";

import React from "react";
import { useAppDispatch } from "../../store/configureStore";
import { setBasket } from "../basket/basketSlice";

export default function ProductCard({
  name,
  imageUrl,
  price,
  brand,
  type,
  id,
}: Product) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    console.log("beforeSetLoading true");
    setLoading(true);
    console.log(" after setLoading: true");
    apiAgent.Basket.addItem(productId)
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => {
        console.log(" before setloading false");
        setLoading(false);
        console.log("after setLoadingFalse");
      });
  }

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "" },
        }}
        avatar={<Avatar>{name.charAt(0).toUpperCase()}</Avatar>}
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
          ${displayCalculatedCurrency(price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brand} / {type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(id)}
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
