import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AccountState } from "../../store/models/AccountState";
import { FieldValues } from "react-hook-form";
import { User } from "../../models/entities/user";
import { apiAgent } from "../../api/ApiService";
import { globalNavigate } from "../../global/GlobalHistory";

export const initialState: AccountState = {
  user: null,
  userLoading: false,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data: FieldValues, thunkAPI: any) => {
    try {
      const loginResponse = await apiAgent.User.login(data);
      localStorage.setItem("token", loginResponse?.token);
      return loginResponse?.token;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const getCurrentUser = createAsyncThunk<User>(
  "account/getCurrentUser",
  async (_, thunkAPI: any) => {
    try {
      const user = await apiAgent.User.getCurrentUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: "User Not Found" });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("token")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      globalNavigate("/");
    },
  },
  extraReducers: (builder) => {
    // Get Current User
    builder.addCase(getCurrentUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.userLoading = false;
      state.user = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.userLoading = false;
      console.log(action.payload);
    });
  },
});

export const { signOut } = accountSlice.actions;
