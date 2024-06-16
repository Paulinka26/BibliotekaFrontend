import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserDto } from '../api/dto/user.dto';
import './AddUserForm.css';
import {LibraryClient} from "../api/library-clients";

const AddUserForm: React.FC = () => {
    // @ts-ignore
    const [formData, setFormData] = useState<UserDto>({
        username: '',
        password: '',
        email: '',
        fullName: '',
        role: 'ROLE_READER',
    });

    const navigate = useNavigate();
    const libraryClient = new LibraryClient();

    const handleChange = (e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name as string]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await libraryClient.addUser(formData);
            if (response.success) {
                console.log('User added successfully:', response.data);
                navigate('/login'); // Redirect to the login page
            } else {
                console.error('Error adding user:', response.statusCode);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <h1>Dodaj nowego użytkownika</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }} className="Add-user-form">
                <TextField
                    id="username"
                    name="username"
                    label="Nazwa użytkownika"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="password"
                    name="password"
                    label="Hasło"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="fullName"
                    name="fullName"
                    label="Pełna nazwa"
                    value={formData.fullName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel id="role-label">Rola</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={formData.role}

                    >
                        <MenuItem value="ROLE_ADMIN">ADMIN</MenuItem>
                        <MenuItem value="ROLE_LIBRARIAN">LIBRARIAN</MenuItem>
                        <MenuItem value="ROLE_READER">READER</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: '#998FC7', color: '#ffffff', width: '100%' }}
                >
                    Dodaj użytkownika
                </Button>
            </form>
        </div>
    );
};

export default AddUserForm;
