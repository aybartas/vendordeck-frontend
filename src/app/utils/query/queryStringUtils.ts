import { ProductParams } from "../../models/query/productParams";

export function ProductParamsToURLSearchParams(
  productParams: ProductParams = {}
) {
  const urlSearchParams = new URLSearchParams();

  urlSearchParams.append("page", productParams?.page?.toString() ?? "");
  urlSearchParams.append("size", productParams?.size?.toString() ?? "");

  if (productParams.sort) {
    urlSearchParams.append(
      "ascending",
      productParams?.sort?.ascending?.toString()!
    );
    urlSearchParams.append("sortBy", productParams?.sort?.sortBy?.toString()!);
  }

  if (productParams?.searchText) {
    urlSearchParams.append("searchText", productParams?.searchText);
  }
  if (productParams?.brands && productParams.brands.length > 0) {
    urlSearchParams.append("brands", productParams.brands.join(","));
  }
  if (productParams?.types && productParams.types.length > 0) {
    urlSearchParams.append("types", productParams.types.join(","));
  }
  if (productParams?.minPrice! > 0) {
    urlSearchParams.append("minPrice", JSON.stringify(productParams.minPrice));
  }
  if (productParams?.maxPrice! > 0) {
    urlSearchParams.append("maxPrice", JSON.stringify(productParams.maxPrice));
  }
  return urlSearchParams;
}
