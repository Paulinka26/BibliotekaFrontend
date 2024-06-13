import React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import './MainPage.css';

export default function LogInButton() {
    return (
        <div className="home-page">
            <h1>Witaj w bibliotece!</h1>
            <img src="/ksiazki.svg" alt="Logo" width="200" height="200"/>
            <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                    m: 1,
                    backgroundColor: 'var(--button-color)', // Ustawienie koloru przycisku zgodnie z zmienną CSS
                    color: '#fff' // Ustawienie koloru tekstu na przycisku na biały
                }}
            >
                Zaloguj
            </Button>
        </div>
    );
}
