
import { BasketItem } from "./basketItem";

export interface Basket {
    id: number;
    buyerId: string;
    basketItems: BasketItem[];
}