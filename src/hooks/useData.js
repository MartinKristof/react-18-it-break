// In a real implementation the data would be streamed with the HTML.

import { useContext } from 'react';

import { DataContext } from '../contexts/DataContext';

// We haven't integrated this part yet, so we'll just use fake data.
const fakeData = ["Wait, it doesn't wait for React to load?", 'How does this even work?', 'I like marshmallows'];

const useData = () => {
  const ctx = useContext(DataContext);

  if (ctx !== null) {
    // This context is only provided on the server.
    // It is here to simulate a suspending data fetch.
    ctx.read();
  }

  return fakeData;
};

export default useData;
