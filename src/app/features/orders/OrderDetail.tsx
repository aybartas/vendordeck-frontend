import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiAgent } from "../../api/ApiService";
import { Order } from "../../models/entities/order";
import Loading from "../../layout/Loading";
import { Box, Grid } from "@mui/material";
import OrderDetailSection from "./OrderDetailSection";
import OrderContentSection from "./OrderContentSection";

export default function OrderDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    apiAgent.Order.getOrderById(id)
      .then((data) => {
        setOrder(data?.order);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading message="Order is loading..."></Loading>;

  return (
    <>
      <Box>
        <OrderDetailSection order={order} />
        <OrderContentSection order={order} />
      </Box>
    </>
  );
}
