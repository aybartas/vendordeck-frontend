import { Sort } from "../models/query/sort";

export const sortOptions: Sort[] = [
  {
    id: 1,
    value: "name",
    label: "Product Name (Asc)",
    ascending: true,
    sortBy: "name",
  },
  {
    id: 2,
    value: "name",
    label: "Product Name (Desc)",
    ascending: false,
    sortBy: "name",
  },
  {
    id: 3,
    value: "price",
    label: "Product Price Low To High",
    ascending: true,
    sortBy: "price",
  },
  {
    id: 4,
    value: "price",
    label: "Product Price High to Low",
    ascending: false,
    sortBy: "price",
  },
];
