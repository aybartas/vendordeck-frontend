import Typography from "@mui/material/Typography";
import BasketTable from "../basket/BasketTable";
import { useAppSelector } from "../../store/configureStore";

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <BasketTable
        items={basket?.basketItems}
        editEnabled={false}
      ></BasketTable>
    </>
  );
}
