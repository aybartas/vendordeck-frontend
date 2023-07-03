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
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { BasketSummary } from "./BasketSummary";
import displayCalculatedCurrency from "../../utils/caculations";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);

  if (!basket || !basket.basketItems || basket.basketItems.length === 0)
    return <Typography> Basket is empty</Typography>;

  console.log(basket.basketItems);
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
                  {displayCalculatedCurrency(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    color="error"
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                        })
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    color="secondary"
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: item.productId,
                        })
                      )
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={status.includes(
                      "pendingRemoveItem" + item.productId
                    )}
                    color="error"
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                        })
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
