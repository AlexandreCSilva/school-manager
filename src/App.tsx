import React from 'react';
import PageRouter from './routes';
import Reset from './globalStyle/Reset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts/UserContext';
import { routes } from './api';
import { createServer } from 'miragejs';

createServer({routes});

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
