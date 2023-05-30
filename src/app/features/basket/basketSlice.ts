import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../models/entities/basket";
import { apiAgent } from "../../api/ApiService";
import { getCookie } from "../../utils/cookiesUtils";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity?: number }
>(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      await apiAgent.Basket.addItem(productId, quantity);
      await thunkAPI.dispatch(fetchBasketAsync());
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number }
>("basket/removeBasketItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    await apiAgent.Basket.removeItem(productId, quantity);
    await thunkAPI.dispatch(fetchBasketAsync());
  } catch (error: any) {
    thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchBasketAsync = createAsyncThunk<Basket>(
  "basket/fetchBasketAsync",
  async (_, thunkAPI) => {
    try {
      const result = await apiAgent.Basket.get();
      return result.basket;
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add basket Item
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    // Remove basket item
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status = "pendingRemoveItem" + action.meta.arg.productId;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.basketItems.findIndex(
        (x) => x.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.basketItems[itemIndex].quantity -= quantity!;
      if (state.basket!.basketItems[itemIndex].quantity <= 0)
        state.basket?.basketItems.splice(itemIndex, 1);
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    builder.addCase(fetchBasketAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.basket = action.payload;
    });
    builder.addCase(fetchBasketAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchBasketAsync.pending, (state) => {
      console.log("pending");
      state.status = "pending";
    });
  },
});

export const { setBasket } = basketSlice.actions;
