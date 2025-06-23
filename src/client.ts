import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { Config } from './types';
import { TransactionService } from './services/transaction.service';
import { ServicesService } from './services/services.service';

export class DexchangeClient {
  private readonly client: AxiosInstance;
  public readonly transaction: TransactionService;
  public readonly services: ServicesService;

  constructor(config: Config) {
    this.client = axios.create({
      baseURL: config.baseUrl || 'https://api-m.dexchange.sn',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
    });

    // Configure retry behavior
    axiosRetry(this.client, {
      retries: 3,
      retryDelay: (retryCount) => {
        return retryCount * 1000; // Time interval between retries (1s, 2s, 3s)
      },
      retryCondition: (error) => {
        // Retry on network errors or 5xx server errors
        return (
          axiosRetry.isNetworkOrIdempotentRequestError(error) ||
          (error.response?.status ? error.response.status >= 500 : false)
        );
      },
    });

    // Add error interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const { data } = error.response;
          throw new Error(data.message || 'Une erreur est survenue');
        }
        throw error;
      }
    );

    this.transaction = new TransactionService(this.client);
    this.services = new ServicesService(this.client);
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
