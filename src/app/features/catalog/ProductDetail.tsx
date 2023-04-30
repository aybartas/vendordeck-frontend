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
import { apiAgent } from "../../api/ApiService";
import displayCalculatedCurrency from "../../utils/caculations";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(0);
  const dispatch = useAppDispatch();

  const { basket, status } = useAppSelector((state) => state.basket);
  const currentProduct = useAppSelector((state) =>
    productSelectors.selectById(state, Number(id))
  );
  const { status: catalogStatus } = useAppSelector((state) => state.catalog);
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

        dispatch(
          addBasketItemAsync({
            productId: currentProduct.id,
            quantity: newQuantity,
          })
        );
      } else {
        const updatedQuanttiy = basketItem.quantity - quantity;
        dispatch(
          removeBasketItemAsync({
            productId: currentProduct.id,
            quantity: updatedQuanttiy,
          })
        );
      }
    }
  }

  useEffect(() => {
    if (basketItem) setQuantity(basketItem.quantity);
    if (!currentProduct) dispatch(fetchProductAsync(Number(id)));
  }, [id, basketItem, currentProduct, dispatch]);

  if (catalogStatus.includes("pending")) return <h3> Loading...</h3>;

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
          {displayCalculatedCurrency(currentProduct.price)}
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
              loading={status.includes("pendingRemoveItem" + currentProduct.id)}
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
