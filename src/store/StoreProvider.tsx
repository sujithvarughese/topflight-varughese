'use client';

import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import {ReactNode} from 'react';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({children}: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}