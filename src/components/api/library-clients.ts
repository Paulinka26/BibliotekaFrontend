import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { BookDto } from "./dto/book.dto";
import { LoanDto } from "./dto/loan.dto";
import { UserDto } from "./dto/user.dto";

export type ClientResponse<T> = {
    success: boolean;
    data: T;
    statusCode: number;
};

export class LibraryClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:8082'
        });
    }

    public async login(
        data: LoginDto
    ): Promise<ClientResponse<LoginResponseDto | null>> {
        try {
            const response: AxiosResponse<LoginResponseDto> = await this.client.post(
                '/login',
                data
            );
            this.client.defaults.headers.common[
                'Authorization'
                ] = `Bearer ${response.data.token}`;
            return {
                success: true,
                data: response.data,
                statusCode: response.status
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async getBooks(): Promise<ClientResponse<BookDto[] | null>> {
        try {
            const response: AxiosResponse<BookDto[]> = await this.client.get('/api/books');
            return {
                success: true,
                data: response.data,
                statusCode: response.status
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async getLoans(): Promise<ClientResponse<LoanDto[] | null>> {
        try {
            const response: AxiosResponse<LoanDto[]> = await this.client.get('/api/loans');
            return {
                success: true,
                data: response.data,
                statusCode: response.status
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async addBook(data: BookDto): Promise<ClientResponse<BookDto | null>> {
        try {
            const response: AxiosResponse<BookDto> = await this.client.post('/api/books', data);
            return {
                success: true,
                data: response.data,
                statusCode: response.status
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async addLoan(data: LoanDto): Promise<ClientResponse<LoanDto | null>> {
        try {
            const response: AxiosResponse<LoanDto> = await this.client.post('/api/loans', data);
            return {
                success: true,
                data: response.data,
                statusCode: response.status
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async addUser(data: UserDto): Promise<ClientResponse<UserDto | null>> {
        try {
            const response: AxiosResponse<UserDto> = await this.client.post('/api/users', data);
            return {
                success: true,
                data: response.data,
                statusCode: response.status
            };
        } catch (error) {
            const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }
}
