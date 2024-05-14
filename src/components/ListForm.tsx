import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemComponent from './ListItem';

interface DataItem {
    id: number;
    Title: string;
    Author: string
    Publisher:string;
    Isbn: number;

}

interface ListFormProps {
    // Deklaruj props jeśli są potrzebne
}

interface ListFormState {
    openItems: { [key: number]: boolean };
}

const daneZBazy: DataItem[] = [
    { id: 1, Title: 'Książka 1', Author: 'Autor książki 1', Publisher: 'Wydawca książki 1', Isbn: 567888765},
    { id: 2, Title: 'Książka 2', Author: 'Autor książki 2', Publisher: 'Wydawca książki 2' , Isbn: 66789876},
    // Dodaj więcej obiektów w zależności od liczby rekordów w bazie danych
];

export default class ListForm extends React.Component<ListFormProps, ListFormState> {
    constructor(props: ListFormProps) {
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
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
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
        );
    }
}
