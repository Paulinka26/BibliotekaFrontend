import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import { LoanDto } from '../api/dto/loan.dto';

interface LoanItemProps {
    item: LoanDto;
}

const LoanItem: React.FC<LoanItemProps> = ({ item }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
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
                        <ListItemIcon />
                        <div>
                            <ListItemText primary={`Data wypożyczenia: ${item.loanDate}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`Planowana data zwrotu: ${item.dueDate}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`Data zwrotu: ${item.returnDate || 'N/A'}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`ID książki: ${item.bookId}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`ID użytkownika: ${item.userId}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                        </div>
                    </ListItemButton>
                </List>
            </Collapse>
        </React.Fragment>
    );
};

export default LoanItem;
