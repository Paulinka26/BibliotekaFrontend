import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BookDto } from "../api/dto/book.dto";
import { LibraryClient } from "../api/library-clients";

const AddBookPage: React.FC = () => {
    const [formData, setFormData] = useState<BookDto>({
        bookId: 0, // Może być wartość domyślna, jeśli nie jest używana
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        yearOfPublish: 0, // Może być wartość domyślna, jeśli nie jest używana
        availableCopies: 0, // Może być wartość domyślna, jeśli nie jest używana
    });

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const libraryClient = new LibraryClient();

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
            const response = await libraryClient.addBook({
                isbn: formData.isbn,
                title: formData.title,
                author: formData.author,
                publisher: formData.publisher,
                yearOfPublish: formData.yearOfPublish,
                availableCopies: formData.availableCopies,
            });
            if (response.success) {
                console.log('Book added successfully:', response.data);
                navigate('/booklist'); // Redirect to the book list
            } else {
                console.error('Error adding book:', response.statusCode);
                setError('Nie udało się dodać książki. Sprawdź dane i spróbuj ponownie.');
            }
        } catch (error) {
            console.error('Error adding book:', error);
            setError('Wystąpił błąd podczas dodawania książki.');
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Dodaj książkę</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <TextField
                    id="isbn"
                    name="isbn"
                    label="ISBN"
                    type="text"
                    value={formData.isbn}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="title"
                    name="title"
                    label="Tytuł"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="author"
                    name="author"
                    label="Autor"
                    type="text"
                    value={formData.author}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="publisher"
                    name="publisher"
                    label="Wydawca"
                    type="text"
                    value={formData.publisher}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="yearOfPublish"
                    name="yearOfPublish"
                    label="Rok wydania"
                    type="number"
                    value={formData.yearOfPublish}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="availableCopies"
                    name="availableCopies"
                    label="Dostępne kopie"
                    type="number"
                    value={formData.availableCopies}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: '#998FC7', color: '#FFFFFF', width: '100%', mt: 2 }}
                >
                    Dodaj książkę
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

export default AddBookPage;
