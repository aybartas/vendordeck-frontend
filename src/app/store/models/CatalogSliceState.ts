import { ProductParams } from "../../models/query/productParams";

export interface CatalogSliceState {
  productsLoaded: boolean;
  status: string;
  filtersLoaded: boolean;
  totalProductCount: number;
  brands: string[];
  types: string[];
  minPrice: number;
  maxPrice: number;
  productParams: ProductParams;
}
