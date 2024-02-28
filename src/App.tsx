import React from 'react';
import PageRouter from './routes';
import Reset from './globalStyle/Reset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <div className="App">
      <Reset />
      <ToastContainer/>
      <UserProvider>
        <PageRouter />
      </UserProvider>
    </div>
  );
}

export default App;
