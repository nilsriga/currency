import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRates, setSelectedCurrency, setPage } from './Components/currencySlice';
import CurrencySelector from './Components/CurrencySelector';

function App() {
  const dispatch = useDispatch();
  const { rates, selectedCurrency, currentPage, totalPages, error } = useSelector((state) => state.currency);

  useEffect(() => {
    dispatch(fetchRates({ currency: selectedCurrency, page: currentPage }));
  }, [selectedCurrency, currentPage, dispatch]);

  const handleCurrencyChange = (e) => {
    dispatch(setSelectedCurrency(e.target.value.toLowerCase()));
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const currentRates = rates[selectedCurrency]?.[currentPage] || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Currency Rates for {selectedCurrency.toUpperCase()}</h1>
      <CurrencySelector
        selectedCurrency={selectedCurrency}
        handleCurrencyChange={handleCurrencyChange}
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <table className="table-auto w-full text-center border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Date Retrieved</th>
            <th className="border px-4 py-2">Rate {selectedCurrency.toUpperCase()}</th>
          </tr>
        </thead>
        <tbody>
          {currentRates.length > 0 ? (
            currentRates.map(rate => (
              <tr key={rate.id}>
                <td className="border px-4 py-2">{new Date(rate.date).toLocaleDateString('en-GB')}</td>
                <td className="border px-4 py-2">{parseFloat(rate.rate).toFixed(4)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2" colSpan="2">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
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
    </div>
  );
}

export default App;