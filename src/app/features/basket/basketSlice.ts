import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../models/basket";

interface BasketState{
    basket: Basket | null
}

const initialState :BasketState = {
    basket:null
}

export const basketSlice = createSlice({
    name:"basket",
    initialState,
    reducers:{
        setBasket:(state,action) => {
            state.basket = action.payload
        },
        removeItem: (state,action) => {
            const {productId,quantity} = action.payload;
            const itemIndex = state.basket?.basketItems.findIndex(x => x.productId === productId);
            if(itemIndex === -1 || itemIndex === undefined) return;
            const item = state.basket!.basketItems[itemIndex];
            item.quantity -= quantity;
            if(item.quantity <= 0) state.basket?.basketItems.splice(itemIndex,1);
        }
    }
});

export const {setBasket,removeItem} = basketSlice.actions
