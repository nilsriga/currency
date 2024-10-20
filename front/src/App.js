import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [rates, setRates] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/currency/${selectedCurrency}?page=1&limit=10`)
      .then(response => {
        setRates(response.data.data);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch currency data.');
      });
  }, [selectedCurrency]);

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value.toLowerCase());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Currency Rates for EUR</h1>
      <div className="mb-4">
        <label htmlFor="currency" className="mr-2">Select Currency:</label>
        <select
          id="currency"
          value={selectedCurrency.toUpperCase()}
          onChange={handleCurrencyChange}
          className="p-2 border rounded"
        >
          <option value="usd">USD</option>
          <option value="jpy">JPY</option>
          <option value="gbp">GBP</option>
          <option value="aud">AUD</option>
          <option value="cny">CNY</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <table className="table-auto w-full text-center border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Date Retrieved</th>
            <th className="border px-4 py-2">Rate {selectedCurrency.toUpperCase()}</th>
          </tr>
        </thead>
        <tbody>
          {rates.length > 0 ? (
            rates.map(rate => (
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
    </div>
  );
}

export default App;
