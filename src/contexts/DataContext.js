import React, { createContext } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children, data }) => <DataContext.Provider value={data}>{children}</DataContext.Provider>;

export default DataProvider;
