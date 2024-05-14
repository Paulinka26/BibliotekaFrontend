import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import ListForm from "./components/ListForm";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/list" element={<ListForm />} />
        </Routes>
    );
}

export default App;
