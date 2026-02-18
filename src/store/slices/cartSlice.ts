import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Pizza } from '../../types';

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ pizza: Pizza; type: number; size: number }>) {
      const { pizza, type, size } = action.payload;
      const itemId = `${pizza.id}_${type}_${size}`;
      
      const existingItem = state.items.find((item) => item.id === itemId);
      
      if (existingItem) {
        existingItem.count += 1;
      } else {
        const typeNames = ['тонкое', 'традиционное'];
        state.items.push({
          id: itemId,
          pizzaId: pizza.id,
          title: pizza.title,
          price: pizza.price,
          imgURL: pizza.imgURL,
          type,
          size,
          count: 1,
        });
      }
      
      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
        state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    incrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.count += 1;
        state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
        state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      }
    },
    decrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.count > 1) {
          item.count -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
        state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
        state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      }
    },
  },
});

export const { addItem, removeItem, clearCart, incrementItem, decrementItem } = cartSlice.actions;
export default cartSlice.reducer;

