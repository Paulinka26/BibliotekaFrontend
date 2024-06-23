import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Snackbar, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoanRequestDto } from "../api/dto/loanRequest.dto";
import {BookDto} from "../api/dto/book.dto";
import {UserDto} from "../api/dto/user.dto";
import {LibraryClient} from "../api/library-clients";


const getDefaultDates = () => {
    const today = new Date();
    const loanDate = today.toISOString().split('T')[0];
    const dueDate = new Date(today.setMonth(today.getMonth() + 1)).toISOString().split('T')[0];
    return { loanDate, dueDate };
};

const AddLoanPage: React.FC = () => {
    const { loanDate, dueDate } = getDefaultDates();

    const [formData, setFormData] = useState<LoanRequestDto>({
        loanDate: loanDate,
        dueDate: dueDate,
        returnDate: null,
        bookId: 0,
        userId: 0,
    });

    const [books, setBooks] = useState<BookDto[]>([]);
    const [users, setUsers] = useState<UserDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const libraryClient = new LibraryClient();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await libraryClient.getBooks();
                if (response.success) {
                    setBooks(response.data || []);
                } else {
                    setError('Wystąpił błąd podczas pobierania książek.');
                }
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Wystąpił błąd podczas pobierania książek.');
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await libraryClient.getUsers();
                if (response.success) {
                    setUsers(response.data || []);
                } else {
                    setError('Wystąpił błąd podczas pobierania użytkowników.');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Wystąpił błąd podczas pobierania użytkowników.');
            }
        };

        fetchBooks();
        fetchUsers();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await libraryClient.addLoan({
                loanDate: formData.loanDate,
                dueDate: formData.dueDate,
                returnDate: formData.returnDate,
                bookId: formData.bookId,
                userId: formData.userId,
            });

            if (response.success) {
                console.log('Loan added successfully:', response.data);
                navigate('/loanlist');
            } else {
                console.error('Error adding loan:', response.statusCode);
                setError('Nie udało się dodać wypożyczenia. Sprawdź dane i spróbuj ponownie.');
            }
        } catch (error) {
            console.error('Error adding loan:', error);
            setError('Wystąpił błąd podczas dodawania wypożyczenia.');
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Dodaj wypożyczenie</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
                <TextField
                    id="loanDate"
                    name="loanDate"
                    label="Data wypożyczenia"
                    type="date"
                    value={formData.loanDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    id="dueDate"
                    name="dueDate"
                    label="Planowana data zwrotu"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    id="returnDate"
                    name="returnDate"
                    label="Data zwrotu"
                    type="date"
                    value={formData.returnDate || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    id="bookId"
                    name="bookId"
                    select
                    label="Wybierz książkę"
                    value={formData.bookId}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option value={0}>Wybierz książkę...</option>
                    {books.map(book => (
                        <option key={book.bookId} value={book.bookId}>
                            {`${book.bookId} - ${book.title}`}
                        </option>
                    ))}
                </TextField>
                <TextField
                    id="userId"
                    name="userId"
                    select
                    label="Wybierz użytkownika"
                    value={formData.userId}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option value={0}>Wybierz użytkownika...</option>
                    {users.map(user => (
                        <option key={user.userId} value={user.userId}>
                            {`${user.userId} - ${user.username}`}
                        </option>
                    ))}
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: '#998FC7', color: '#FFFFFF', width: '100%', mt: 2 }}
                >
                    Dodaj wypożyczenie
                </Button>
            </form>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={error}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </div>
    );
};

export default AddLoanPage;
