import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BookDto } from '../api/dto/book.dto';
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface BookItemProps {
    item: BookDto;
    onDelete: (id: number) => Promise<void>;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BookItem: React.FC<BookItemProps> = ({ item, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickDelete = async () => {
        try {
            await onDelete(item.bookId);
        } catch (error) {
            setErrorMessage('Książka jest wypożyczona lub nie masz uprawnień aby ją usunąć.');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <React.Fragment>
            <ListItemButton onClick={handleClick} sx={{ justifyContent: 'space-between' }}>
                <ListItemText primary={item.title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <DeleteIcon
                                onClick={handleClickDelete}
                                style={{ cursor: 'pointer', visibility: item.availableCopies > 0 ? 'visible' : 'hidden' }}
                            />
                        </ListItemIcon>
                        <ListItemIcon>
                            <Link to={`/editbook/${item.bookId}`}>
                                <EditIcon style={{ cursor: 'pointer', marginLeft: '10px' }} />
                            </Link>
                        </ListItemIcon>
                        <div>
                            <ListItemText primary={`Autor: ${item.author}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`Wydawca: ${item.publisher}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`ISBN: ${item.isbn}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`Rok wydania: ${item.yearOfPublish}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`Dostępne kopie: ${item.availableCopies}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`ID: ${item.bookId}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                        </div>
                    </ListItemButton>
                </List>
            </Collapse>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

export default BookItem;
