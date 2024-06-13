import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemComponent from './LoanItem'; // Zmieniony import na LoanItem

interface LoanItem {
    loan_id: number;
    due_date: string;
    loan_date: string;
    return_date: string | null;
    book_id: number;
    user_id: number;
}

interface LoanListProps {

}

interface LoanListState {
    openItems: { [key: number]: boolean };
}

const daneZBazy: LoanItem[] = [
    { loan_id: 1, due_date: '2024-05-25', loan_date: '2024-05-17', return_date: null, book_id: 1, user_id: 1 },
    { loan_id: 2, due_date: '2024-06-01', loan_date: '2024-05-15', return_date: '2024-05-20', book_id: 2, user_id: 2 },


export default class LoanList extends React.Component<LoanListProps, LoanListState> {
    constructor(props: LoanListProps) {
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
                            Lista wypożyczeń
                        </ListSubheader>
                    }
                >
                    {daneZBazy.map((item) => (
                        <ListItemComponent
                            key={item.loan_id} // Zmieniony klucz na loan_id
                            item={item}
                            isOpen={!!this.state.openItems[item.loan_id]} // Zmieniony klucz na loan_id
                            onClick={() => this.handleClick(item.loan_id)} // Zmieniony klucz na loan_id
                        />
                    ))}
                </List>
            </div>
        );
    }
}
