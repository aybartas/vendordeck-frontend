import { ProductParams } from "../../models/query/productParams";

export interface CatalogSlice {
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
