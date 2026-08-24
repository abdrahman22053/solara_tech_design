import { Product, User, UserRole } from './domain.models';

export interface ApiResponse<T> { data: T; message?: string; meta?: { page: number; pageSize: number; total: number }; }
export interface LoginRequest { email: string; password: string; rememberMe: boolean; }
export interface LoginResponse { accessToken: string; refreshToken: string; user: User; }
export interface RegisterRequest { email: string; password: string; role: UserRole; firstName: string; lastName: string; company: string; phone: string; }
export interface ProductQuery { search?: string; category?: string; status?: string; page?: number; pageSize?: number; }
export type ProductPayload = Omit<Product, 'id' | 'status' | 'categoryLabel'>;
