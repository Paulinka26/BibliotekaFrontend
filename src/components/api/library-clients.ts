import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { BookDto } from './dto/book.dto';
import { LoanDto } from './dto/loan.dto';
import { UserDto } from './dto/user.dto';
import {LoanRequestDto} from "./dto/loanRequest.dto";

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

        // Interceptor to attach token to each request
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    public async login(data: LoginDto): Promise<ClientResponse<LoginResponseDto | null>> {
        try {
            const response: AxiosResponse<LoginResponseDto> = await this.client.post('/login', data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
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
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0,
            };
        }
    }
    public async getBook(id: number): Promise<ClientResponse<BookDto | null>> {
        try {
            const response: AxiosResponse<BookDto> = await this.client.get(`/api/books/${id}`);
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
    public async getUsers(): Promise<ClientResponse<UserDto[] | null>> {
        try {
            const response: AxiosResponse<UserDto[]> = await this.client.get('/api/users');
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
        returnDate: string | null;
        dueDate: string;
        loanDate: string;
        userId: number;
        bookId: number
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
    public async updateBook(id: number, data: BookDto): Promise<ClientResponse<BookDto | null>> {
        try {
            const response: AxiosResponse<BookDto> = await this.client.put(`/api/books/${id}`, data);
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
    public async getLoan(id: number): Promise<ClientResponse<LoanDto | null>> {
        try {
            const response: AxiosResponse<LoanDto> = await this.client.get(`/api/loans/${id}`);
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

    public async updateLoan(id: number, data: LoanRequestDto): Promise<ClientResponse<LoanDto | null>> {
        try {
            const response: AxiosResponse<LoanDto> = await this.client.put(`/api/loans/${id}`, data);
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

    public async deleteUser(id: number): Promise<ClientResponse<null>> {
        try {
            await this.client.delete(`/api/users/${id}`);
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
