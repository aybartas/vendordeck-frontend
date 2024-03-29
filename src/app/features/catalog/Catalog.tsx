import { useEffect } from "react";
import ProductList from "./ProductList";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import SearchIcon from "@mui/icons-material/Search";
import {
  applyFilters,
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "./catalogSlice";
import {
  Autocomplete,
  Box,
  Button,
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
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import displayCalculatedCurrency from "../../utils/caculations";
import { Sort } from "../../models/query/sort";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    totalProductCount,
    brands,
    types,
    minPrice,
    maxPrice,
    productParams,
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

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <TextField
            label="Search products"
            placeholder="Search a product by name"
            variant="outlined"
            fullWidth
            value={productParams?.searchText ?? ""}
            onChange={(e) =>
              dispatch(setProductParams({ searchText: e.target.value }))
            }
          ></TextField>
        </Paper>

        <Paper sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Sort By"
              value={productParams.sort?.id}
              onChange={(e) => {
                const sortOption = sortOptions.find(
                  (x) => x.id === e.target.value
                );
                const newSort: Sort = {
                  ascending: sortOption?.ascending,
                  sortBy: sortOption?.sortBy,
                };

                dispatch(setProductParams({ sort: newSort }));
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
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
            onChange={(_, newValue) =>
              dispatch(setProductParams({ types: newValue }))
            }
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
            onChange={(_, newValue) =>
              dispatch(setProductParams({ brands: newValue }))
            }
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
              valueLabelDisplay="auto"
              min={minPrice}
              max={maxPrice}
              value={[
                productParams?.minPrice ?? 0,
                productParams?.maxPrice ?? 0,
              ]}
              getAriaValueText={displayCalculatedCurrency}
              onChange={(_, newValue) => {
                const values = newValue as number[];
                dispatch(setProductParams({ minPrice: values[0] }));
                dispatch(setProductParams({ maxPrice: values[1] }));
              }}
            />
          </Box>
        </Paper>

        <Box
          sx={{
            mb: 2,
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SearchIcon />}
            onClick={() => dispatch(applyFilters())}
          >
            Search
          </Button>
        </Box>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid
        item
        xs={9}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography marginTop="5px">
          Displaying {` ${productParams.size}`} of
          {` ${totalProductCount} `} products
        </Typography>
        <Pagination
          page={productParams.page! + 1}
          size="large"
          count={Math.ceil(totalProductCount / 6)}
          color="secondary"
          onChange={(_, value) => {
            console.log("ch", value);
            dispatch(setProductParams({ page: value - 1 }));
            dispatch(applyFilters());
          }}
        />
      </Grid>
    </Grid>
  );
}
