import { Button, Grid, Typography } from "@mui/material";
import { BasketSummary } from "./BasketSummary";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useAppSelector } from "../../store/configureStore";
import BasketTable from "./BasketTable";

export default function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket || !basket.basketItems || basket.basketItems.length === 0)
    return <Typography> Basket is empty</Typography>;

  return (
    <Fragment>
      <BasketTable items={basket.basketItems} editEnabled={true}></BasketTable>
      <Grid container spacing={2}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
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
