import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductProps} from "@/app/products/page";

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
      if (!existingItem) {
        state.items.push({...action.payload });
        state.totalQuantity += 1;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalQuantity -= 1;
    },
    toggleCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {addItem, removeItem, toggleCartOpen} = cartSlice.actions;
export default cartSlice.reducer;