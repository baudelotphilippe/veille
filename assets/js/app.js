/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// // any CSS you import will output into a single css file (app.css in this case)
// import './styles/app.css';

// // start the Stimulus application
// import './bootstrap';
require("bootstrap/dist/css/bootstrap.css");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/app.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { createRoot } from 'react-dom/client';
import * as AxiosService from './services/AxiosService';

AxiosService.verifTokenExist();

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);
