import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';

interface DataItem {
    id: number;
    Title: string;
    Author: string
    Publisher:string;
    Isbn: number;
}

interface ListItemProps {
    item: DataItem;
    isOpen: boolean;
    onClick: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, isOpen, onClick }) => {
    return (
        <React.Fragment>
            <ListItemButton onClick={onClick}>
                <ListItemIcon />
                <ListItemText primary={item.Title} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon/>
                        <div>
                            <ListItemText primary={`Autor: ${item.Author}`} />
                            <ListItemText primary={`Wydawca: ${item.Publisher}`} />
                            <ListItemText primary={`Numer ISBN: ${item.Isbn}`} />
                        </div>
                    </ListItemButton>
                </List>
            </Collapse>
        </React.Fragment>
    );
};

export default ListItem;
