import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import BookList from "./components/BookList";
import LoanList from "./components/LoanList";
import MainPage from "./components/MainPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/main" />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/booklist" element={<BookList />} />
            <Route path="/loanlist" element={<LoanList />} />

        </Routes>
    );
}

export default App;
