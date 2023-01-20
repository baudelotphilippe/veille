import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/app.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { createRoot } from 'react-dom/client';
import * as AxiosService from './services/AxiosService';
// import 'jquery/dist/jquery.min.js';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

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
