import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useStoreContext } from "../../context/Context";
import displayCalculatedCurrency from "../../utils/caculations";
import React from "react";

export function BasketSummary() {
  const { basket } = useStoreContext();

  const subtotal =
    basket?.basketItems.reduce(
      (sum: number, item) => sum + item.quantity * item.price,
      0
    ) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">
                {displayCalculatedCurrency(subtotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">
                {displayCalculatedCurrency(deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {displayCalculatedCurrency(subtotal + deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
