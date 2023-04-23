import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Loading from "../../layout/Loading";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
} from "./catalogSlice";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { sortOptions } from "../../constants/filterConstants";
import { ProductFilter } from "../../models/filters/productFilter";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    status,
    filtersLoaded,
    brands,
    types,
    minPrice,
    maxPrice,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchFiltersAsync());
    }
  }, [dispatch, filtersLoaded]);

  const [filterSelection, setFilterSelection] = useState<ProductFilter>();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  function valuetext(val: number) {
    return `$${val}`;
  }

  if (status.includes("pending"))
    return <Loading message="Loading products..."></Loading>;

  console.log(minPrice);
  console.log(maxPrice);
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <TextField
            label="Search products"
            placeholder="Search a product by name"
            variant="outlined"
            fullWidth
          ></TextField>
        </Paper>

        <Paper sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Sort By"
              onChange={
                (e) => {}
                // handleFilterChange("sort", e.target.value as number)
              }
            >
              {sortOptions.map((option) => (
                <MenuItem value={option.id}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        <Paper sx={{ mb: 2 }}>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={types}
            disableCloseOnSelect
            getOptionLabel={(types) => types}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Types" placeholder="Types" />
            )}
          />
        </Paper>

        <Paper sx={{ mb: 2 }}>
          <Autocomplete
            multiple
            id="checkboxes-tags-brands"
            options={brands}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Brands"
                placeholder="Select brands to search product"
              />
            )}
          />
        </Paper>

        <Paper sx={{ mb: 2, mt: 2 }}>
          <Typography paddingTop="5px" align="center" variant="subtitle1">
            Price
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            alignContent="center"
            paddingX="30px"
            paddingY="5px"
          >
            <Slider
              getAriaLabel={() => "Product prices"}
              value={[minPrice, maxPrice]}
              valueLabelDisplay="auto"
              min={minPrice}
              max={maxPrice}
              getAriaValueText={valuetext}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products}></ProductList>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid
        item
        xs={9}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography marginTop="5px">Displaying 1-6 of 30 products</Typography>
        <Pagination page={2} size="large" count={10} color="secondary" />
      </Grid>
    </Grid>
  );
}
