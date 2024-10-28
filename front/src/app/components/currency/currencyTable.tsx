// Import React library
import React from 'react';

// Define the structure of a Rate object
interface Rate {
  id: number; // Unique identifier for the rate
  date: string; // Date the rate was retrieved
  rate: string; // Exchange rate value
}

// Define the props for the CurrencyTable component
interface CurrencyTableProps {
  rates: Rate[]; // Array of rate objects
  selectedCurrency: string; // The currently selected currency
}

// Define the CurrencyTable functional component
const CurrencyTable: React.FC<CurrencyTableProps> = ({ rates, selectedCurrency }) => (
  <table className="table-auto w-full text-center border-collapse">
    <thead>
      <tr>
        <th className="border px-4 py-2">Date Retrieved</th>
        <th className="border px-4 py-2">Rate {selectedCurrency.toUpperCase()}</th>
      </tr>
    </thead>
    <tbody>
      {rates.length > 0 ? (
        rates.map((rate) => (
          <tr key={rate.id}>
            <td className="border px-4 py-2">{new Date(rate.date).toLocaleDateString('en-GB')}</td>
            <td className="border px-4 py-2">{parseFloat(rate.rate).toFixed(4)}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td className="border px-4 py-2" colSpan={2}>No data available</td>
        </tr>
      )}
    </tbody>
  </table>
);

// Export the CurrencyTable component as the default export
export default CurrencyTable;
