import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { BookDto } from './dto/book.dto';
import { LoanDto } from './dto/loan.dto';
import { UserDto } from './dto/user.dto';

export type ClientResponse<T> = {
    success: boolean;
    data: T;
    statusCode: number;
};

export class LibraryClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:8082',
        });
    }

    public async login(data: LoginDto): Promise<ClientResponse<LoginResponseDto | null>> {
        try {
            const response: AxiosResponse<LoginResponseDto> = await this.client.post('/login', data);
            this.client.defaults.headers.common[
                'Authorization'
                ] = `Bearer ${response.data.token}`;
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async getBooks(): Promise<ClientResponse<BookDto[] | null>> {
        try {
            const response: AxiosResponse<BookDto[]> = await this.client.get('/api/books');
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async getBookById(bookId: number): Promise<ClientResponse<BookDto | null>> {
        try {
            const response: AxiosResponse<BookDto> = await this.client.get(`/api/books/${bookId}`);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async getLoans(): Promise<ClientResponse<LoanDto[] | null>> {
        try {
            const response: AxiosResponse<LoanDto[]> = await this.client.get('/api/loans');
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async addBook(data: {
        author: string;
        isbn: string;
        availableCopies: number;
        publisher: string;
        title: string;
        yearOfPublish: number
    }): Promise<ClientResponse<BookDto | null>> {
        try {
            const response: AxiosResponse<BookDto> = await this.client.post('/api/books', data);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async addLoan(data: {
        returnDate: string;
        dueDate: string;
        loanDate: string;
        userId: number;
        bookId: number;
    }): Promise<ClientResponse<LoanDto | null>> {
        try {
            const bookResponse = await this.client.get(`/api/books/${data.bookId}`);
            if (bookResponse.status !== 200) {
                return {
                    success: false,
                    data: null,
                    statusCode: bookResponse.status,
                };
            }

            const userResponse = await this.client.get(`/api/users/${data.userId}`);
            if (userResponse.status !== 200) {
                return {
                    success: false,
                    data: null,
                    statusCode: userResponse.status,
                };
            }

            const response: AxiosResponse<LoanDto> = await this.client.post('/api/loans', data);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async getUserById(userId: number): Promise<ClientResponse<UserDto | null>> {
        try {
            const response: AxiosResponse<UserDto> = await this.client.get(`/api/users/${userId}`);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async addUser(data: UserDto): Promise<ClientResponse<UserDto | null>> {
        try {
            const response: AxiosResponse<UserDto> = await this.client.post('/api/users', data);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }

    public async deleteBook(id: number): Promise<ClientResponse<null>> {
        try {
            await this.client.delete(`/api/books/${id}`);
            return {
                success: true,
                data: null,
                statusCode: 200,
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }


    public async deleteLoan(id: number): Promise<ClientResponse<null>> {
        try {
            await this.client.delete(`/api/loans/${id}`);
            return {
                success: true,
                data: null,
                statusCode: 200,
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }
}
