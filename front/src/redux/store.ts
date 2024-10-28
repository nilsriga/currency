// src/app/redux/store.ts

// Import the configureStore function from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import the currencyReducer from the currencySlice file
import currencyReducer from './currencySlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Add the currency reducer to the store
    currency: currencyReducer,
  },
});

// Define the RootState type, which represents the state of the entire Redux store
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type, which represents the dispatch function of the Redux store
export type AppDispatch = typeof store.dispatch;
