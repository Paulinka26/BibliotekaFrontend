import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import DeleteIcon from '@mui/icons-material/Delete'; // Ikona kosza
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

interface LoanItemProps {
    item: LoanDto;
    onDelete?: (id: number) => Promise<void>;
}

const LoanItem: React.FC<LoanItemProps> = ({ item, onDelete }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleDelete = async () => {
        if (onDelete) {
            await onDelete(item.loanId);
        }
    };

    const handleEdit = () => {
        navigate(`/editloan/${item.loanId}`);
    };

    return (
        <React.Fragment>
            <ListItemButton onClick={handleClick} sx={{ justifyContent: 'space-between' }}>
                <ListItemText primary={`ID wypożyczenia: ${item.loanId}`} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <IconButton onClick={handleEdit} style={{ cursor: 'pointer' }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={handleDelete} style={{ cursor: 'pointer' }}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemIcon>
                        <div>
                            <ListItemText primary={`Data wypożyczenia: ${item.loanDate}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`Planowana data zwrotu: ${item.dueDate}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`Data zwrotu: ${item.returnDate || 'N/A'}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`ID książki: ${item.book.bookId}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`ID użytkownika: ${item.user.userId}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                        </div>
                    </ListItemButton>
                </List>
            </Collapse>
        </React.Fragment>
    );
};

export default LoanItem;
