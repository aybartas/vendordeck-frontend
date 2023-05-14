import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AccountState } from "../../store/models/AccountState";
import { FieldValues } from "react-hook-form";
import { User } from "../../models/entities/user";
import { apiAgent } from "../../api/ApiService";

export const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data: FieldValues, thunkAPI: any) => {
    try {
      const user = await apiAgent.User.login(data);
      localStorage.setItem("token", JSON.stringify(user));
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const getCurrentUser = createAsyncThunk<User>(
  "account/signInUser",
  async (_, thunkAPI: any) => {
    try {
      const user = await apiAgent.User.getCurrentUser();
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, getCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.rejected, getCurrentUser.rejected),
      (state, action) => {
        console.log(action.payload);
      }
    );
  },
});
