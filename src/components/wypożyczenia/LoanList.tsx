import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LoanItem from './LoanItem';
import './LoanList.css';
import { LoanDto } from '../api/dto/loan.dto';
import { LibraryClient } from '../api/library-clients';

const LoanList: React.FC = () => {
    const [loans, setLoans] = useState<LoanDto[]>([]);
    const client = new LibraryClient();

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await client.getLoans();
                if (response.success && response.data) {
                    setLoans(response.data);
                } else {
                    console.error('Error fetching loans:', response.statusCode);
                }
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };

        fetchLoans();
    }, [client]);

    const handleDelete = async (id: number) => {
        try {
            const response = await client.deleteLoan(id);
            if (response.success) {
                setLoans((prevLoans) => prevLoans.filter((loan) => loan.loanId !== id));
            } else {
                console.error('Error deleting loan:', response.statusCode);
            }
        } catch (error) {
            console.error('Error deleting loan:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h4" className="List-title">
                Lista wypożyczeń
            </Typography>
            <Box className="Loan-list">
                <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav" aria-label="loan list">
                    {loans.map((loan) => (
                        <LoanItem key={loan.loanId} item={loan} onDelete={handleDelete} />
                    ))}
                </List>
                <Button
                    component={Link}
                    to="/addloan"
                    variant="contained"
                    sx={{ mt: 2, mb: 2, backgroundColor: '#998FC7', color: '#ffffff', width: '100%' }}
                >
                    Dodaj wypożyczenie
                </Button>
            </Box>
        </Box>
    );
};

export default LoanList;
