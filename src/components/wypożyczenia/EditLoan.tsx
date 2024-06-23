import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { LibraryClient } from '../api/library-clients';
import { LoanDto} from '../api/dto/loan.dto';
import {LoanRequestDto} from "../api/dto/loanRequest.dto";

const EditLoan: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const client = new LibraryClient();
    const [loan, setLoan] = useState<LoanDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [updatedFields, setUpdatedFields] = useState<Partial<LoanRequestDto>>({});

    useEffect(() => {
        const fetchLoan = async () => {
            try {
                const response = await client.getLoan(Number(id));
                if (response.success && response.data) {
                    setLoan(response.data);
                } else {
                    console.error('Error fetching loan:', response.statusCode);
                    setError('Nie znaleziono wypożyczenia');
                }
            } catch (error) {
                console.error('Error fetching loan:', error);
                setError('Wystąpił błąd podczas pobierania danych wypożyczenia');
            } finally {
                setLoading(false);
            }
        };

        fetchLoan();
    }, [id, client]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedFields({
            ...updatedFields,
            [name]: name === 'userId' || name === 'bookId' ? parseInt(value) : value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loan) {
            try {
                const updatedLoan: LoanRequestDto = {
                    bookId: updatedFields.bookId || loan.book.bookId,
                    userId: updatedFields.userId || loan.user.userId,
                    loanDate: updatedFields.loanDate || loan.loanDate,
                    dueDate: updatedFields.dueDate || loan.dueDate,
                    returnDate: updatedFields.returnDate || loan.returnDate,
                };
                const response = await client.updateLoan(loan.loanId, updatedLoan);
                if (response.success) {
                    navigate('/LoanList');
                } else {
                    console.error('Error updating loan:', response.statusCode);
                    setError('Wystąpił błąd podczas aktualizacji wypożyczenia');
                }
            } catch (error) {
                console.error('Error updating loan:', error);
                setError('Wystąpił błąd podczas aktualizacji wypożyczenia');
            }
        }
    };

    if (loading) return <Typography>Ładowanie...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom>Edytuj wypożyczenie</Typography>
            <Paper elevation={3} style={{ padding: '16px', margin: '16px', width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Aktualna data wypożyczenia: {loan?.loanDate}</Typography>
                            <TextField
                                id="loanDate"
                                name="loanDate"
                                label="Nowa data wypożyczenia"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={updatedFields.loanDate || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Aktualna planowana data zwrotu: {loan?.dueDate}</Typography>
                            <TextField
                                id="dueDate"
                                name="dueDate"
                                label="Nowa planowana data zwrotu"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={updatedFields.dueDate || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Aktualna data zwrotu: {loan?.returnDate || 'N/A'}</Typography>
                            <TextField
                                id="returnDate"
                                name="returnDate"
                                label="Nowa data zwrotu"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={updatedFields.returnDate || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Aktualne ID książki: {loan?.book.bookId}</Typography>
                            <TextField
                                id="bookId"
                                name="bookId"
                                label="Nowe ID książki"
                                value={updatedFields.bookId || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                type="number"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Aktualne ID użytkownika: {loan?.user.userId}</Typography>
                            <TextField
                                id="userId"
                                name="userId"
                                label="Nowe ID użytkownika"
                                value={updatedFields.userId || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                type="number"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, backgroundColor: '#998FC7', color: '#ffffff', width: '100%' }}
                    >
                        Zapisz zmiany
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default EditLoan;
