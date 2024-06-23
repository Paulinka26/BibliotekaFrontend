import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import UserItem from './UserItem';
import './AddUserForm.css';
import { UserDto } from '../api/dto/user.dto';
import { LibraryClient } from '../api/library-clients';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<UserDto[]>([]);
    const client = new LibraryClient();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await client.getUsers();
                if (response.success && response.data) {
                    setUsers(response.data);
                } else {
                    console.error('Error fetching users:', response.statusCode);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [client]);

    const handleDelete = async (id: number) => {
        try {
            const response = await client.deleteUser(id);
            if (response.success) {
                setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));
            } else {
                console.error('Error deleting user:', response.statusCode);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h4" className="List-title">
                Lista użytkowników
            </Typography>
            <Box className="Loan-list">
                <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav" aria-label="user list">
                    {users.map((user) => (
                        <UserItem key={user.userId} item={user} onDelete={handleDelete} />
                    ))}
                </List>
                <Button
                    component={Link}
                    to="/adduser"
                    variant="contained"
                    sx={{ mt: 2, mb: 2, backgroundColor: '#998FC7', color: '#ffffff', width: '100%' }}
                >
                    Dodaj użytkownika
                </Button>
            </Box>
        </Box>
    );
};

export default UserList;
