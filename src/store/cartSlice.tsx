import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductProps} from "@/app/products/page";
import {toast} from "sonner";

interface CartState {
  items: ProductProps[];
  totalQuantity: number;
  isCartOpen: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductProps>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        toast("Max quantity reached for this product.")
        return
      }
      state.items.push({...action.payload });
      state.totalQuantity += 1;
      toast("Item added to cart.")

    },
    removeItem: (state, action: PayloadAction<number>) => {
      if (action.payload === -1) {
        state.items = [];
        state.totalQuantity = 0;
        toast("Cart cleared.")
        return;
      }
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalQuantity -= 1;
      toast("Item removed from cart.")
    },
    toggleCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {addItem, removeItem, toggleCartOpen} = cartSlice.actions;
export default cartSlice.reducer;