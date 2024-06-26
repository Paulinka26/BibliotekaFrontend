import React from 'react';
import './App.css';
import LoginForm from './components/logowanie/LoginForm';
import BookList from "./components/ksiązki/BookList";
import LoanList from "./components/wypożyczenia/LoanList";
import MainPage from "./components/main/MainPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ApiProvider from "./components/api/ApiProvider";
import AddBookPage from "./components/ksiązki/AddBookPge";
import AddLoanPage from "./components/wypożyczenia/AddLoanPage";
import Selection from "./components/main/Selection";
import AddUserForm from "./components/rejestracja/AddUserFrom";
import EditBook from "./components/ksiązki/EditBook";
import EditLoan from "./components/wypożyczenia/EditLoan";
import UserList from "./components/rejestracja/UserList";

function App() {
    return (
        <BrowserRouter>
            <ApiProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/main" />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/booklist" element={<BookList />} />
                    <Route path="/loanlist" element={<LoanList />} />
                    <Route path="/addbook" element={<AddBookPage />} />
                    <Route path="/addloan" element={<AddLoanPage />} />
                    <Route path="/selection" element={<Selection />} />
                    <Route path="/adduser" element={<AddUserForm />} />
                    <Route path="/editbook/:id" element={<EditBook/>} />
                    <Route path="/editloan/:id" element={<EditLoan/>} />
                    <Route path="/userList" element={<UserList />} />

                </Routes>
            </ApiProvider>
        </BrowserRouter>
    );
}

export default App;
