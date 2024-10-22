import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Rate {
  id: number;
  date: string;
  rate: string;
}

interface CurrencyState {
  rates: Record<string, Record<number, Rate[]>>;
  selectedCurrency: string;
  currentPage: number;
  totalPages: number;
  error: string | null;
}

const initialState: CurrencyState = {
  rates: {},
  selectedCurrency: 'usd',
  currentPage: 1,
  totalPages: 1,
  error: null,
};

export const fetchRates = createAsyncThunk(
  'currency/fetchRates',
  async ({ currency, page }: { currency: string; page: number }) => {
    const response = await axios.get(`http://${process.env.API_URL}/currency/${currency}?page=${page}&limit=10`);
    return { data: response.data.data as Rate[], currency, page, totalPages: response.data.totalPages };
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setSelectedCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
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
        state.error = null;
      })
      .addCase(fetchRates.rejected, (state) => {
        state.error = 'Failed to fetch currency data.';
      });
  },
});

export const { setSelectedCurrency, setPage } = currencySlice.actions;
export default currencySlice.reducer;
