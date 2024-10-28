// src/app/components/CurrencySelector.tsx

// Import React library
'use client'
import React from 'react';

// Import currency options from a separate file
import currencyOptions from './currencyOptions';

// Define the props for the CurrencySelector component
interface CurrencySelectorProps {
  selectedCurrency: string; // The currently selected currency
  handleCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Function to handle currency change
}

// Define the CurrencySelector functional component
const CurrencySelector: React.FC<CurrencySelectorProps> = ({ selectedCurrency, handleCurrencyChange }) => {
  return (
    <div className="mb-4">
      {/* Label for the currency selector */}
      <label htmlFor="currency" className="mr-2">Select Currency:</label>
      {/* Dropdown menu for selecting a currency */}
      <select
        id="currency"
        value={selectedCurrency} // Set the value to the selected currency
        onChange={handleCurrencyChange} // Call the handleCurrencyChange function when the selection changes
        className="p-2 border rounded" // Apply Tailwind CSS classes for styling
      >
        {/* Map through the currency options and create an option element for each */}
        {currencyOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Export the CurrencySelector component as the default export
export default CurrencySelector;
