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
  urlSearchParams.append(
    "searchText",
    productParams?.searchText?.toString() ?? ""
  );

  urlSearchParams.append(
    "dataFilters",
    JSON.stringify(productParams?.dataFilters)
  );

  return urlSearchParams;
}
