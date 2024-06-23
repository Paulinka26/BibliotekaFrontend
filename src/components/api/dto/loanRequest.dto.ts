export interface LoanRequestDto {
    bookId: number;
    userId: number;
    loanDate: string;
    dueDate: string;
    returnDate: string | null;
}