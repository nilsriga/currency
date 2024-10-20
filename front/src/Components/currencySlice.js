import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRates = createAsyncThunk(
  'currency/fetchRates',
  async ({ currency, page }) => {
    const response = await axios.get(`http://localhost:3000/currency/${currency}?page=${page}&limit=10`);
    return { data: response.data.data, currency, page, totalPages: response.data.totalPages };
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    rates: {},
    selectedCurrency: 'usd',
    currentPage: 1,
    totalPages: 1,
    error: null,
  },
  reducers: {
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
      state.currentPage = 1; // Reset to first page when currency changes
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.fulfilled, (state, action) => {
        const { data, currency, page, totalPages } = action.payload;
        if (!state.rates[currency]) {
          state.rates[currency] = {};
        }
        state.rates[currency][page] = data;
        state.totalPages = totalPages;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.error = 'Failed to fetch currency data.';
      });
  },
});

export const { setSelectedCurrency, setPage } = currencySlice.actions;
export default currencySlice.reducer;
