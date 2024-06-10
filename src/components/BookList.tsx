import React from 'react';
import './BookList.css';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemComponent from './BookItem';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom'; 

interface DataItem {
    id: number;
    Title: string;
    Author: string;
    Publisher: string;
    Isbn: number;
}

interface BookListProps {

}

interface BookListState {
    openItems: { [key: number]: boolean };
}

const daneZBazy: DataItem[] = [
    { id: 1, Title: 'Książka 1', Author: 'Autor książki 1', Publisher: 'Wydawca książki 1', Isbn: 567888765 },
    { id: 2, Title: 'Książka 2', Author: 'Autor książki 2', Publisher: 'Wydawca książki 2', Isbn: 66789876 },
    // Add more objects depending on the number of records in the database
];

export default class BookList extends React.Component<BookListProps, BookListState> {
    constructor(props: BookListProps) {
        super(props);
        this.state = {
            openItems: {}
        };
    }

    handleClick = (itemId: number) => {
        this.setState(prevState => ({
            openItems: {
                ...prevState.openItems,
                [itemId]: !prevState.openItems[itemId]
            }
        }));
    };

    render() {
        return (
            <div className="Book-list"><div id="rectangle1"></div>
                <List
                    sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Lista książek
                        </ListSubheader>
                    }
                >
                    {daneZBazy.map((item) => (
                        <ListItemComponent
                            key={item.id}
                            item={item}
                            isOpen={!!this.state.openItems[item.id]}
                            onClick={() => this.handleClick(item.id)}
                        />
                    ))}
                </List>
                <Button
                    variant="contained"
                    component={Link}
                    to="/loanlist"
                    sx={{m: 1}}
                >
                    Lista wypożyczeń
                </Button>
            </div>
        );
    }
}
