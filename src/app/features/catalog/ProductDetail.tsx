import {
  Divider,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/product";
import { apiAgent } from "../../api/ApiService";
import displayCalculatedCurrency from "../../utils/caculations";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { removeItem, setBasket } from "../basket/basketSlice";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  // get basket
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector((state) => state.basket);

  const basketItem = basket?.basketItems.find(
    (I) => I.productId === Number(id)
  );

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      let quantity = parseInt(event.target.value);
      setQuantity(quantity);
    }
  }

  function handleUpdateBasket() {
    if (currentProduct) {
      // item exists and number increased.
      if (!basketItem || quantity > basketItem.quantity) {
        const newQuantity = basketItem
          ? quantity - basketItem.quantity
          : quantity;

        apiAgent.Basket.addItem(currentProduct.id, newQuantity)
          .then((basket) => dispatch(setBasket(basket)))
          .catch((error) => console.log(error));
      } else {
        const updatedQuanttiy = basketItem.quantity - quantity;
        apiAgent.Basket.removeItem(currentProduct.id, updatedQuanttiy)
          .then(() =>
            dispatch(
              removeItem({
                productId: currentProduct.id,
                quantity: updatedQuanttiy,
              })
            )
          )
          .catch((error) => console.log(error));
      }
    }
  }

  useEffect(() => {
    if (basketItem) setQuantity(basketItem.quantity);
    apiAgent.Catalog.productDetails(parseInt(id ?? ""))
      .then((response) => setCurrentProduct(response))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [id, basketItem]);

  if (isLoading) return <h3> Loading...</h3>;

  if (!currentProduct) return <h3>Product not found </h3>;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={currentProduct.imageUrl}
          alt={currentProduct.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3"> {currentProduct.name}</Typography>
        <Divider></Divider>
        <Typography variant="h4">
          ${displayCalculatedCurrency(currentProduct.price)}
        </Typography>
        <TableContainer sx={{ mt: "3rem" }}>
          <TableBody>
            <TableRow>
              <TableCell> Name</TableCell>
              <TableCell> {currentProduct.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Description</TableCell>
              <TableCell> {currentProduct.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Brand</TableCell>
              <TableCell> {currentProduct.brand}</TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                basketItem?.quantity === quantity ||
                (!basketItem && quantity === 0)
              }
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={handleUpdateBasket}
            >
              {basketItem ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
