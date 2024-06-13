
export interface LoanDto {
    loanId: number;
    dueDate: string;
    loanDate: string;
    returnDate: string | null;
    bookId: number;
    userId: number;
}
