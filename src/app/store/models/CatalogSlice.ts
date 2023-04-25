import { ProductParams } from "../../models/query/productParams";

export interface CatalogSlice {
  productsLoaded: boolean;
  status: string;
  filtersLoaded: boolean;
  brands: string[];
  types: string[];
  minPrice: number;
  maxPrice: number;
  productParams: ProductParams;
}
