import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserDto } from '../api/dto/user.dto';
import { IconButton } from '@mui/material';

interface UserItemProps {
    item: UserDto;
    onDelete?: (id: number) => Promise<void>;
}

const UserItem: React.FC<UserItemProps> = ({ item, onDelete }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleDelete = async () => {
        if (onDelete) {
            await onDelete(item.userId);
        }
    };

    return (
        <React.Fragment>
            <ListItemButton onClick={handleClick} sx={{ justifyContent: 'space-between' }}>
                <ListItemText primary={`Nazwa użytkownika: ${item.username}`}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <IconButton onClick={handleDelete} style={{ cursor: 'pointer' }}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemIcon>
                        <div>
                            <ListItemText primary={`ID użytkownika: ${item.userId}`}  sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`Email: ${item.email}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`Pełna nazwa: ${item.fullName}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                            <ListItemText primary={`Rola: ${item.role}`} sx={{ pb: 1, lineHeight: 1.5 }} />
                        </div>
                    </ListItemButton>
                </List>
            </Collapse>
        </React.Fragment>
    );
};

export default UserItem;
