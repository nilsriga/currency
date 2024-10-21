import React from 'react';

interface Rate {
  id: number;
  date: string;
  rate: string;
}

interface CurrencyTableProps {
  rates: Rate[];
  selectedCurrency: string;
}

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

export default CurrencyTable;
