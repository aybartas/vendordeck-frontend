import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductsResponse } from "../../models/product";
import { apiAgent } from "../../api/ApiService";
import { RootState } from "../../store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<ProductsResponse>(
  "catalog/fetchProductsAsync",
  async (_, thunkAPI) => {
    try {
      return await apiAgent.Catalog.catalogList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await apiAgent.Catalog.productDetails(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchFiltersAsync = createAsyncThunk(
  "catalog/fetchFiltersAsync",
  async (_, thunkAPI) => {
    try {
      return await apiAgent.Catalog.filterValues();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    status: "idle",
    filtersLoaded: false,
    brands: [],
    types: [],
    minPrice: 0,
    maxPrice: 0,
  }),
  reducers: {},

  extraReducers: (builder) => {
    // product list
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload.items);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    // single product
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    // filters
    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.filtersLoaded = false;
    });
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      const { brands, types, minPrice, maxPrice } = action.payload;
      state.brands = brands;
      state.types = types;
      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
      state.filtersLoaded = true;
    });
    builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.filtersLoaded = true;
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);
