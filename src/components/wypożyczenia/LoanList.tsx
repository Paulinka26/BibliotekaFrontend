import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import axios from 'axios';
import LoanItem from './LoanItem';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './LoanList.css';
import { LoanDto } from '../api/dto/loan.dto';

const LoanList: React.FC = () => {
    const [loans, setLoans] = useState<LoanDto[]>([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/loans');
                console.log(response);

                const mappedLoans: LoanDto[] = response.data.map((loan: any) => ({
                    loanId: loan.loanId,
                    dueDate: formatDate(loan.dueDate),
                    loanDate: formatDate(loan.loanDate),
                    returnDate: loan.returnDate ? formatDate(loan.returnDate) : null, // Format return date if available
                    bookId: loan.book?.bookId || 0,
                    userId: loan.user.userId
                }));

                setLoans(mappedLoans);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };

        const formatDate = (dateString: string): string => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            return `${day}-${month}-${year}`;
        };

        fetchLoans();
    }, []);

    return (
        <Box>
            <Typography variant="h4" className="List-title">Lista wypożyczeń</Typography>
            <Box className="Loan-list">
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                    component="nav"
                    aria-label="loan list"
                >
                    {loans.map((loan) => (
                        <LoanItem key={loan.loanId} item={loan} />
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
