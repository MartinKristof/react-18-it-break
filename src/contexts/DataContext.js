import React, { createContext } from 'react';

export const DataContext = createContext(null);

// eslint-disable-next-line import/prefer-default-export
export const DataProvider = ({ children, data }) => (
  <DataContext.Provider value={data}>{children}</DataContext.Provider>
);
