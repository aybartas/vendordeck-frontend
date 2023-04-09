import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../models/basket";
import { apiAgent } from "../../api/ApiService";

interface BasketState{
    basket: Basket | null;
    status: string;
}

const initialState :BasketState = {
    basket:null,
    status: "idle"
}

export const addBasketItemAsync = createAsyncThunk<Basket,{productId:number,quantity?:number}>(
    "basket/addBasketItemAsync",
    async ({productId ,quantity = 1}) => {
        try {
            return await apiAgent.Basket.addItem(productId,quantity);
        } catch (error) {
            console.log(error);
        }
    }
);

export const removeBasketItemAsync = createAsyncThunk<void,{productId:number,quantity?:number}>(
    "basket/removeBasketItemAsync",
    async ({productId ,quantity = 1}) => {
        try {
        await apiAgent.Basket.removeItem(productId,quantity);
        } catch (error) {
            console.log(error);
        }
    }
);

export const basketSlice = createSlice({
    name:"basket",
    initialState,
    reducers:{
        setBasket:(state,action) => {
            state.basket = action.payload
        }
    },
    extraReducers:(builder => {
        // Add basket Item
        builder.addCase(addBasketItemAsync.pending,(state,action) =>{
            state.status = "pendingAddItem" + action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled,(state,action) =>{
            state.status = "idle";
            state.basket = action.payload
        });
        builder.addCase(addBasketItemAsync.rejected,(state) =>{
            state.status = "idle";
        });

        // Remove basket item
        builder.addCase(removeBasketItemAsync.pending,(state,action) =>{
            state.status = "pendingRemoveItem" + action.meta.arg.productId;
        });
        builder.addCase(removeBasketItemAsync.fulfilled,(state,action) =>{
            const {productId,quantity} = action.meta.arg;
            const itemIndex = state.basket?.basketItems.findIndex(x => x.productId === productId);
            if(itemIndex === -1 || itemIndex === undefined) return;
            const item = state.basket!.basketItems[itemIndex];
            item.quantity -= quantity!;
            if(item.quantity <= 0) state.basket?.basketItems.splice(itemIndex,1);
            state.status = "idle";
        });
        builder.addCase(removeBasketItemAsync.rejected,(state) =>{
            state.status = "idle";
        });
    }) 
});

export const {setBasket} = basketSlice.actions
