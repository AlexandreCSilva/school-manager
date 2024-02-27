import React from 'react';
import PageRouter from './routes';
import Reset from './globalStyle/Reset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Reset />
      <ToastContainer/>
      <PageRouter />
    </div>
  );
}

export default App;
