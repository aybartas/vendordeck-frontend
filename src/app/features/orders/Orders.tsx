import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { apiAgent } from "../../api/ApiService";
import Loading from "../../layout/Loading";
import { Order } from "../../models/entities/order";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  OrderStatusConfig,
  OrderStatusKey,
  orderStatus,
} from "../../constants/orderConstants";
import displayCalculatedCurrency from "../../utils/caculations";

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiAgent.Order.orderList()
      .then((res) => setOrders(res?.orders))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const getOrderStatusChip = (status: OrderStatusKey) => {
    const currentStatus =
      orderStatus[status] ?? (orderStatus.Pending as OrderStatusConfig);

    return (
      <Chip
        label={currentStatus.label}
        color={
          (currentStatus.color as
            | "info"
            | "success"
            | "error"
            | "default"
            | "primary"
            | "secondary"
            | "warning") || "primary"
        }
      ></Chip>
    );
  };

  if (loading) return <Loading message="Loading orders"></Loading>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order #</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.orderNumber}
              </TableCell>
              <TableCell>{displayCalculatedCurrency(order.total)}</TableCell>
              <TableCell>
                {new Date(order.orderDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{getOrderStatusChip(order.orderStatus)}</TableCell>
              <TableCell>
                <Button
                  startIcon={<VisibilityIcon />}
                  color="secondary"
                ></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
