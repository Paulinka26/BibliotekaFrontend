import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';

interface LoanItem {
    loan_id: number;
    due_date: string;
    loan_date: string;
    return_date: string | null;
    book_id: number;
    user_id: number;
}

interface LoanItemProps {
    item: LoanItem;
    isOpen: boolean;
    onClick: () => void;
}

const LoanItem: React.FC<LoanItemProps> = ({ item, isOpen, onClick }) => {
    return (
        <React.Fragment>
            <ListItemButton onClick={onClick}>
                <ListItemIcon />
                <ListItemText primary={`Loan ID: ${item.loan_id}`} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon />
                        <div>
                            <ListItemText primary={`Due Date: ${item.due_date}`} />
                            <ListItemText primary={`Loan Date: ${item.loan_date}`} />
                            <ListItemText primary={`Return Date: ${item.return_date || 'Not returned yet'}`} />
                            <ListItemText primary={`Book ID: ${item.book_id}`} />
                            <ListItemText primary={`User ID: ${item.user_id}`} />
                        </div>
                    </ListItemButton>
                </List>
            </Collapse>
        </React.Fragment>
    );
};

export default LoanItem;
