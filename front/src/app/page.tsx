// 'use client' directive to indicate this file is a client-side component
'use client';

// Import React and necessary hooks
import React, { useEffect } from 'react';

// Import hooks and actions from Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchRates, setSelectedCurrency, setPage } from '../redux/currencySlice';

// Import custom components
import CurrencySelector from './components/currency/currencySelector';
import CurrencyTable from './components/currency/currencyTable';
import CurrencyLineChart from './components/currency/currencyLineChart'; // Import the new chart component

// Import types from the Redux store
import { RootState, AppDispatch } from '../redux/store';

// Define the Home component
export default function Home() {
  // Get the dispatch function from Redux
  const dispatch: AppDispatch = useDispatch();

  // Get the necessary state from the Redux store
  const { rates, selectedCurrency, currentPage, totalPages, error } = useSelector((state: RootState) => state.currency);

  // Fetch rates whenever the selected currency or current page changes
  useEffect(() => {
    dispatch(fetchRates({ currency: selectedCurrency, page: currentPage }));
  }, [selectedCurrency, currentPage, dispatch]);

  // Handle currency change event
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCurrency(e.target.value.toLowerCase()));
  };

  // Handle page change event
  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  // Get the current rates for the selected currency and page
  const currentRates = rates[selectedCurrency]?.[currentPage] || [];

  // Render the component
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Currency Rates for {selectedCurrency.toUpperCase()}</h1>
      <CurrencySelector selectedCurrency={selectedCurrency} handleCurrencyChange={handleCurrencyChange} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <CurrencyTable rates={currentRates} selectedCurrency={selectedCurrency} />
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-center mb-4">Exchange Rate Over Time</h2>
        <CurrencyLineChart rates={currentRates} />
      </div>
    </div>
  );
}
