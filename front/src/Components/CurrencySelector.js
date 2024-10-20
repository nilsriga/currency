import React from 'react';
import currencyOptions from './currencyOptions';

const CurrencySelector = ({ selectedCurrency, handleCurrencyChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="currency" className="mr-2">Select Currency:</label>
      <select
        id="currency"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        className="p-2 border rounded"
      >
        {currencyOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
