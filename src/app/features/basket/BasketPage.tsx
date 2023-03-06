import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../context/Context";
import { Box } from "@mui/system";
import { apiAgent } from "../../api/ApiService";
import { LoadingButton } from "@mui/lab";
import { BasketSummary } from "./BasketSummary";
import displayCalculatedCurrency from "../../utils/caculations";
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import React from "react";

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  function handleAddItemToBasket(productId: number, name: string) {
    setStatus({ loading: true, name: name });
    apiAgent.Basket.addItem(productId, 1)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => {
        console.log("add item finally");
        setStatus({ loading: false, name: "" });
      });
  }

  function handleRemoveItemFromBasket(
    productId: number,
    quantity = 1,
    name: string
  ) {
    setStatus({ loading: true, name: name });
    apiAgent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  if (!basket) return <Typography> Basket is empty</Typography>;

  console.log("basketpage will return");
  console.log("basthfddfgn");

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subcost</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.basketItems.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="item">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      style={{ height: 50, marginRight: 20 }}
                    ></img>
                    <span>{item.productName}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {" "}
                  ${displayCalculatedCurrency(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === "remove" + item.productId
                    }
                    color="error"
                    onClick={() =>
                      handleRemoveItemFromBasket(
                        item.productId,
                        1,
                        "remove" + item.productId
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={
                      status.loading && status.name === "add" + item.productId
                    }
                    color="secondary"
                    onClick={() =>
                      handleAddItemToBasket(
                        item.productId,
                        "add" + item.productId
                      )
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === "delete" + item.productId
                    }
                    color="error"
                    onClick={() =>
                      handleRemoveItemFromBasket(
                        item.productId,
                        item.quantity,
                        "delete" + item.productId
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary></BasketSummary>
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            color="primary"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}
