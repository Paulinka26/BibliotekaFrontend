import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {LoanDto} from "../api/dto/loan.dto";
import {LibraryClient} from "../api/library-clients";


const AddLoanPage: React.FC = () => {
    const [formData, setFormData] = useState<Partial<LoanDto>>({
        dueDate: '',
        loanDate: '',
        bookId: undefined,
        userId: undefined,
        returnDate: null,
    });

    const navigate = useNavigate();
    const libraryClient = new LibraryClient();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'bookId' || name === 'userId' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await libraryClient.addLoan(formData as LoanDto);
            if (response.success) {
                console.log('Loan added successfully:', response.data);
                navigate('/loanlist'); // Redirect to the loan list
            } else {
                console.error('Error adding loan:', response.statusCode);
            }
        } catch (error) {
            console.error('Error adding loan:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Dodaj wypożyczenie</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <TextField
                    id="dueDate"
                    name="dueDate"
                    label="Data zwrotu"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
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
                    id="bookId"
                    name="bookId"
                    label="ID książki"
                    type="number"
                    value={formData.bookId ?? ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="userId"
                    name="userId"
                    label="ID użytkownika"
                    type="number"
                    value={formData.userId ?? ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: '#998FC7', color: '#FFFFFF', width: '100%', mt: 2 }}
                >
                    Dodaj wypożyczenie
                </Button>
            </form>
        </div>
    );
};

export default AddLoanPage;
