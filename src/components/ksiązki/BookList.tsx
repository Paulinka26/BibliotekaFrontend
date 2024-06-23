import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Button, Typography, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { BookDto } from '../api/dto/book.dto';
import BookItem from './BookItem';
import { LibraryClient } from '../api/library-clients';
import './BookList.css';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<BookDto[]>([]);
    const [error, setError] = useState<string | null>(null); // State for error message
    const client = new LibraryClient();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await client.getBooks();
                if (response.success && response.data) {
                    setBooks(response.data);
                } else {
                    console.error('Error fetching books:', response.statusCode);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [client]);

    const handleDelete = async (id: number) => {
        try {
            const response = await client.deleteBook(id);
            if (response.success) {
                setBooks((prevBooks) => prevBooks.filter((book) => book.bookId !== id));
            } else {
                console.error('Error deleting book:', response.statusCode);
                if (response.statusCode === 409) {
                    setError('Nie można usunąć książki, ponieważ jest wypożyczona.');
                } else {
                    setError('Wystąpił błąd podczas usuwania książki.');
                }
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            setError('Wystąpił błąd podczas usuwania książki.');
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
    };

    return (
        <Box>
            <Typography variant="h4" className="List-title">
                Lista książek
            </Typography>
            <Box className="Book-list">
                <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav" aria-label="book list">
                    {books.map((book) => (
                        <BookItem key={book.bookId} item={book} onDelete={handleDelete} />
                    ))}
                </List>
                <Button
                    component={Link}
                    to="/addbook"
                    variant="contained"
                    sx={{ mt: 2, mb: 2, backgroundColor: '#998FC7', color: '#ffffff', width: '100%' }}
                >
                    Dodaj książkę
                </Button>
            </Box>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={error}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </Box>
    );
};

export default BookList;
