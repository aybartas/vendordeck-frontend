import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { Order } from "../../models/entities/order";
import displayCalculatedCurrency from "../../utils/caculations";
import { Address } from "../../models/entities/address";

interface Props {
  order: Order | null;
}

export default function OrderDetailSection({ order }: Props) {
  const shippingAddress = order?.shippingAddress as Address;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} sm={6}>
        <Card>
          <CardContent>
            <Typography align="center" variant="h6" component="div">
              Order Summary
            </Typography>

            <Grid container>
              <Grid item xs={4} md={3} sm={6}>
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  Order #
                </Typography>
                <Typography variant="h6" align="center" component="div">
                  {order?.orderNumber}
                </Typography>
              </Grid>
              <Grid item xs={4} md={3} sm={6}>
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  Delivery Fee
                </Typography>
                <Typography variant="h6" align="center" component="div">
                  {displayCalculatedCurrency(order?.deliveryFee)}
                </Typography>
              </Grid>
              <Grid item xs={4} md={3} sm={6}>
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  Subtotal
                </Typography>
                <Typography variant="h6" align="center" component="div">
                  {displayCalculatedCurrency(order?.subTotal)}
                </Typography>
              </Grid>
              <Grid item xs={4} md={3} sm={6}>
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  Total #
                </Typography>
                <Typography variant="h6" align="center" component="div">
                  {displayCalculatedCurrency(order?.total)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} sm={6}>
        <Card>
          <CardContent>
            <Typography align="center" variant="h6" component="div">
              Shipping Details
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "stretch",
              }}
            >
              <div>
                <Typography variant="body2" color="text.secondary">
                  Country
                </Typography>
                <Typography variant="h6" component="div">
                  {shippingAddress?.country}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="text.secondary">
                  City
                </Typography>
                <Typography variant="h6" component="div">
                  {shippingAddress?.city}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="text.secondary">
                  State
                </Typography>
                <Typography variant="h6" component="div">
                  {shippingAddress?.state}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="text.secondary">
                  Zip
                </Typography>
                <Typography variant="h6" component="div">
                  {shippingAddress?.zip}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="h6" component="div">
                  {shippingAddress?.address1}
                </Typography>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
