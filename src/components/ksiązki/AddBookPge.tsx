import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {BookDto} from "../api/dto/book.dto";
import {LibraryClient} from "../api/library-clients";

const AddBookPage: React.FC = () => {
    const [formData, setFormData] = useState<BookDto>({
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        yearOfPublish: undefined,
        availableCopies: undefined,
    });

    const navigate = useNavigate();
    const libraryClient = new LibraryClient();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'yearOfPublish' || name === 'availableCopies' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await libraryClient.addBook(formData);
            if (response.success) {
                console.log('Book added successfully:', response.data);
                navigate('/booklist'); // Redirect to the book list
            } else {
                console.error('Error adding book:', response.statusCode);
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <h1>Dodaj książkę</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <TextField
                    id="title"
                    name="title"
                    label="Tytuł"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="author"
                    name="author"
                    label="Autor"
                    value={formData.author}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="publisher"
                    name="publisher"
                    label="Wydawca"
                    value={formData.publisher}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="isbn"
                    name="isbn"
                    label="ISBN"
                    value={formData.isbn}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="yearOfPublish"
                    name="yearOfPublish"
                    label="Rok wydania"
                    value={formData.yearOfPublish || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    id="availableCopies"
                    name="availableCopies"
                    label="Dostępne kopie"
                    value={formData.availableCopies || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: '#998FC7', color: '#ffffff', width: '100%' }}
                >
                    Dodaj książkę
                </Button>
            </form>
        </div>
    );
};

export default AddBookPage;
