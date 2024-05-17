import * as React from 'react';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import './MainPage.css';


export default function LogInButton() {
    return (
        <div className="home-page">
            <h1>Witaj na stronie głównej!</h1>
            <img src="/logo.svg" alt="Logo" width="200" height="200"/>
            <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{m: 1}}>
                Zaloguj
            </Button>
        </div>
    );
}
