import { OrderedProductItem } from "./orderedProductItem";

export interface OrderItem {
  orderedProductItem: OrderedProductItem;
  price: number;
  quantity: number;
  id: number;
}
