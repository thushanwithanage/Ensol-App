import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App"
import Login from './components/login';
import Dashboard from './components/dashboard';
import Orders from './components/orders';

ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>

      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route exact path="/dashboard" element={<Dashboard />} />

        <Route path="/orders/:id" element={<Orders/>}/>
        
      </Routes>
    </React.Fragment>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
