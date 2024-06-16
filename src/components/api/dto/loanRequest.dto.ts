// W nowym pliku np. api/dto/loanRequest.dto.ts
export interface LoanRequestDto {
    bookId: number;
    userId: number;
    loanDate: string;
    dueDate: string;
    returnDate: string | null;
}
