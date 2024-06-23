import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { LibraryClient } from '../api/library-clients';
import { BookDto } from "../api/dto/book.dto";

const EditBook: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const client = new LibraryClient();
    const [book, setBook] = useState<BookDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [updatedFields, setUpdatedFields] = useState<Partial<BookDto>>({});

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await client.getBook(Number(id));
                if (response.success && response.data) {
                    setBook(response.data);
                } else {
                    console.error('Error fetching book:', response.statusCode);
                    setError('Nie znaleziono książki');
                }
            } catch (error) {
                console.error('Error fetching book:', error);
                setError('Wystąpił błąd podczas pobierania danych książki');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id, client]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedFields({
            ...updatedFields,
            [name]: name === 'yearOfPublish' || name === 'availableCopies' ? parseInt(value) : value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (book) {
            try {
                const updatedBook = { ...book, ...updatedFields };
                const response = await client.updateBook(book.bookId, updatedBook);
                if (response.success) {
                    navigate('/BookList');
                } else {
                    if (response.statusCode === 403) {
                        setError('Nie masz uprawnień do edycji.');
                    } else {
                        setError('Wystąpił błąd podczas aktualizacji książki');
                    }
                    console.error('Error updating book:', response.statusCode);
                }
            } catch (error) {
                console.error('Error updating book:', error);
                setError('Wystąpił błąd podczas aktualizacji książki');
            }
        }
    };

    if (loading) return <Typography>Ładowanie...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom>Edytuj książkę</Typography>
            <Paper elevation={3} style={{ padding: '16px', margin: '16px', width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="title"
                        name="title"
                        label="Nowy tytuł"
                        value={updatedFields.title || book?.title || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        id="author"
                        name="author"
                        label="Nowy autor"
                        value={updatedFields.author || book?.author || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        id="publisher"
                        name="publisher"
                        label="Nowy wydawca"
                        value={updatedFields.publisher || book?.publisher || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        id="isbn"
                        name="isbn"
                        label="Nowy ISBN"
                        value={updatedFields.isbn || book?.isbn || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        id="yearOfPublish"
                        name="yearOfPublish"
                        label="Nowy rok wydania"
                        value={updatedFields.yearOfPublish || book?.yearOfPublish || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        type="number"
                        required
                    />
                    <TextField
                        id="availableCopies"
                        name="availableCopies"
                        label="Nowe dostępne kopie"
                        value={updatedFields.availableCopies || book?.availableCopies || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        type="number"
                        required
                    />
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

export default EditBook;
