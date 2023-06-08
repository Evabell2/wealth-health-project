import React, { useState } from 'react';
import { createRoot } from 'react-dom/client'; // Import depuis "react-dom/client"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style/style.css';
import './style/datePicker.css';
import CreateEmployee from './pages/CreateEmployee';
import CurrentEmployee from './pages/CurrentEmployee';
import Header from './Components/Header';
import { store } from './store'
import { Provider } from "react-redux"

const App = () => {
  return (
    <Provider store={store}>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route
            path="/current-employee"
            element={<CurrentEmployee />}
          />
        </Routes>
      </BrowserRouter>
      
    </Provider>

  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);