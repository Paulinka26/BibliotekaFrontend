import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import axios from 'axios';
import { BookDto } from "../api/dto/book.dto";
import BookItem from './BookItem';
import { Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<BookDto[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const renderRow = ({ index, style }: ListChildComponentProps) => {
        const book = books[index];
        return (
            <div style={style}>
                <BookItem item={book} />
            </div>
        );
    };

    return (
        <Box>
            <Typography variant="h4" className="List-title">Lista książek</Typography>
            <Box className="Book-list">
                <FixedSizeList
                    height={400} // Ustaw wysokość listy
                    width="100%"
                    itemSize={80} // Ustaw wysokość jednego elementu na liście
                    itemCount={books.length}
                >
                    {renderRow}
                </FixedSizeList>
                <Button
                    component={Link}
                    to="/addbook"
                    variant="contained"
                    sx={{ mt: 2, mb: 2, backgroundColor: '#998FC7', color: '#ffffff', width: '100%' }}
                >
                    Dodaj książkę
                </Button>
            </Box>
        </Box>
    );
};

export default BookList;
