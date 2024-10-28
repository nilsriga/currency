// 'use client' directive to indicate this file is a client-side component
'use client';

// Import React library
import React from 'react';

// Import the Provider component from react-redux
import { Provider } from 'react-redux';

// Import the Redux store from the store file
import { store } from './store';

// Define the Providers functional component
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Wrap the children components with the Redux Provider
    // This makes the Redux store available to all nested components
    <Provider store={store}>
      {children}
    </Provider>
  );
}
