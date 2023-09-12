import { OrderStatusKey } from "../../constants/orderConstants";
import { Address } from "./address";
import { OrderItem } from "./orderItem";

export interface Order {
  id: number;
  buyerId: string;
  orderDate: string;
  orderNumber: number;
  orderItems: OrderItem[];
  subTotal: number;
  deliveryFee: number;
  orderStatus: OrderStatusKey;
  shippingAddress: Address;
  total: number;
}
