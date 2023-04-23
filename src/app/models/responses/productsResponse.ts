import { Product } from "../entities/product";

export interface ProductsResponse {
  items: Product[];
  totalCount: number;
}
