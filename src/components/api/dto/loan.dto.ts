import {BookDto} from "./book.dto";
import {UserDto} from "./user.dto";


export interface LoanDto {
    loanId: number;
    loanDate: string;
    dueDate: string;
    returnDate: string | null;
    book: BookDto;
    user: UserDto;
}
