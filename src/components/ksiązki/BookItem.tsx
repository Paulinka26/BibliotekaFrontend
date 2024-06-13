import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {BookDto} from "../api/dto/book.dto";

interface BookItemProps {
    item: BookDto;
}

const BookItem: React.FC<BookItemProps> = ({ item }) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <div onClick={handleClick} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <ListItemText
                    primary={item.title}
                    secondary={`Autor: ${item.author}, Wydawca: ${item.publisher}, Numer ISBN: ${item.isbn}, ID: ${item.bookId}, Rok wydania: ${item.yearOfPublish}, Dostępne kopie: ${item.availableCopies}`}
                />
            </div>
        </React.Fragment>
    );
};

export default BookItem;
