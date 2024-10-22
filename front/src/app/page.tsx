// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRates, setSelectedCurrency, setPage } from '../redux/currencySlice';
import CurrencySelector from './components/currency/currencySelector';
import CurrencyTable from './components/currency/currencyTable';
import { RootState, AppDispatch } from '../redux/store';
import CurrencyLineChart from './components/currency/currencyLineChart'; // Import the new chart component

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { rates, selectedCurrency, currentPage, totalPages, error } = useSelector((state: RootState) => state.currency);

  useEffect(() => {
    dispatch(fetchRates({ currency: selectedCurrency, page: currentPage }));
  }, [selectedCurrency, currentPage, dispatch]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCurrency(e.target.value.toLowerCase()));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const currentRates = rates[selectedCurrency]?.[currentPage] || [];

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

      {/* Render the CurrencyLineChart */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-center mb-4">Exchange Rate Over Time</h2>
        <CurrencyLineChart rates={currentRates} />
      </div>
    </div>
  );
}
