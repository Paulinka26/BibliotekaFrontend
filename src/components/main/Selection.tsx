// NewPageSelection.js

import React from 'react';
import { Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Selection = () => {
    return (
        <Container>
            <h1>Wybierz stronę</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        fullWidth
                        component={Link}
                        to="/loanlist"
                        sx={{
                            m: 1,
                            backgroundColor: 'var(--button-color)',
                            color: '#fff'
                        }}
                    >
                        Lista wypożyczeń
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        fullWidth
                        component={Link}
                        to="/booklist"
                        sx={{
                            m: 1,
                            backgroundColor: 'var(--button-color)',
                            color: '#fff'
                        }}
                    >
                        Lista książek
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        fullWidth
                        component={Link}
                        to="/userlist"
                        sx={{
                            m: 1,
                            backgroundColor: 'var(--button-color)',
                            color: '#fff'
                        }}
                    >
                        Lista użytkowników
                    </Button>
                </Grid>

            </Grid>
        </Container>
    );
};
export default Selection;
