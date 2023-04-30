import { Sort } from "./sort";

export interface ProductParams {
  page?: number;
  size?: number;
  sort?: Sort;
  searchText?: string;
  brands?: string[];
  types?: string[];
  minPrice?: number;
  maxPrice?: number;
}
