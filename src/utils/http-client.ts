import axios, { AxiosInstance, AxiosError } from 'axios';
import { DexchangeConfig, DEFAULT_BASE_URL, ErrorResponse } from '../types';
import { handleApiError } from './error-handler';

export class HttpClient {
  private client: AxiosInstance;

  constructor(config: DexchangeConfig) {
    this.client = axios.create({
      baseURL: config.baseURL || DEFAULT_BASE_URL,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      response => response,
      (error: AxiosError<ErrorResponse>) => handleApiError(error)
    );
  }

  protected async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  protected async post<T>(url: string, data: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }
}