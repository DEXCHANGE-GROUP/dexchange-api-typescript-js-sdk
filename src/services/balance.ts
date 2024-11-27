import { HttpClient } from '../utils/http-client';
import { BalanceResponse } from '../types';

export class BalanceService extends HttpClient {
  async getBalance(): Promise<BalanceResponse> {
    return this.get<BalanceResponse>('/api-services/balance');
  }
}