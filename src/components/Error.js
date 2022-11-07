import React from 'react';

const Error = ({ error }) => (
  <div>
    <h1>Application Error</h1>
    <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
  </div>
);

export default Error;
