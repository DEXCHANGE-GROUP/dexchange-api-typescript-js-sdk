import axios, { AxiosInstance } from 'axios';
import { DexchangeConfig, DEFAULT_BASE_URL } from './config';

export class DexchangeClient {
  private client: AxiosInstance;

  constructor(config: DexchangeConfig) {
    this.client = axios.create({
      baseURL: config.baseURL || DEFAULT_BASE_URL,
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  protected async get<T>(url: string) {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  protected async post<T>(url: string, data: any) {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }
}