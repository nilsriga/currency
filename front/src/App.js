import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/currency')
      .then(response => setRates(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Currency Rates</h1>
      <ul>
        {rates.map(rate => (
          <li key={rate.currency}>{rate.currency}: {rate.rate}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
