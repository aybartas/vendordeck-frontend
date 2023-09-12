import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Order } from "../../models/entities/order";
import OrderedProductCard from "./OrderedProductCard";

interface Props {
  order: Order | null;
}

export default function OrderContentSection({ order }: Props) {
  const items = order?.orderItems;

  return (
    <Card sx={{ marginTop: 2 }}>
      <Typography
        sx={{ marginTop: 2 }}
        align="center"
        variant="h5"
        component="div"
        color="text.primary"
      >
        Ordered Items
      </Typography>
      <CardContent>
        <Grid spacing={2} container sx={{ marginTop: 2 }}>
          {items?.map((item) => (
            <Grid item xs={12} md={4} sm={4}>
              <OrderedProductCard {...item} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
