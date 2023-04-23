import { Basket } from "../entities/basket";
import { Sort } from "../query/sort";

export interface ProductFilter {
  sort: Sort | null;
  minPrice: number;
  brands: string[];
  types: string[];
  maxPrice: number;
}
