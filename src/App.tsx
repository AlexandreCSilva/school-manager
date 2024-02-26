import React from 'react';
import PageRouter from './routes';
import Reset from './globalStyle/Reset';

function App() {
  return (
    <div className="App">
      <Reset />
      <PageRouter />
    </div>
  );
}

export default App;
