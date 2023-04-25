import { DataFilter } from "../filters/dataFilter";
import { Sort } from "./sort";

export interface ProductParams {
  page?: number;
  size?: number;
  sort?: Sort;
  searchText?: string;
  dataFilters?: DataFilter[];
}
