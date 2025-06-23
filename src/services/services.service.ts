import { AxiosInstance } from 'axios';
import { BalanceResponse, ServicesResponse } from '../types';

export class ServicesService {
  constructor(private readonly client: AxiosInstance) {}

  /**
   * Get current account balance
   */
  async getBalance(): Promise<BalanceResponse> {
    const response = await this.client.get('/api/v1/api-services/balance');
    return response.data;
  }

  /**
   * Get list of available payment services
   */
  async getServices(): Promise<ServicesResponse> {
    const response = await this.client.get('/api/v1/api-services/services');
    return response.data;
  }
}
