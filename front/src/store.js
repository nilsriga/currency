import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './Components/currencySlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});
