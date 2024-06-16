import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { BookDto } from '../api/dto/book.dto';
import List from "@mui/material/List";

interface BookItemProps {
    item: BookDto;
    onDelete: (id: number) => void;
}

const BookItem: React.FC<BookItemProps> = ({ item, onDelete }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickDelete = () => {
        onDelete(item.bookId);
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
                            <DeleteIcon onClick={handleClickDelete} style={{ cursor: 'pointer' }} />
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
        </React.Fragment>
    );
};

export default BookItem;
