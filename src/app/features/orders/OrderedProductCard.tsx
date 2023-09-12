import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { OrderItem } from "../../models/entities/orderItem";
import displayCalculatedCurrency from "../../utils/caculations";

export default function OrderedProductCard(orderItem: OrderItem) {
  return (
    <Card elevation={4}>
      <CardActionArea>
        <Grid
          sx={{ alignItems: "center", marginLeft: 1 }}
          spacing={1}
          container
        >
          <Grid item xs={12} md={2} sm={2}>
            <CardMedia
              component="img"
              sx={{
                alignContent: "center",
                alignItems: "center",
                maxHeight: 100,
                objectFit: "contain",
              }}
              image={orderItem.orderedProductItem?.pictureUrl}
            />
          </Grid>
          <Grid item xs={12} md={10} sm={10}>
            <CardContent>
              <Typography variant="h6" component="div">
                {orderItem.orderedProductItem.name}
              </Typography>
              <Stack marginTop={2} direction="row" spacing={2}>
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Quantity
                  </Typography>
                  <Typography variant="h6" component="div">
                    {orderItem.quantity}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Unit Price
                  </Typography>
                  <Typography variant="h6" component="div">
                    {displayCalculatedCurrency(orderItem.price)}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
