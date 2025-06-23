import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { TransactionService } from './services/transaction.service';
import { ServicesService } from './services/services.service';
import { Config } from './types';

export * from './types';

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

    // Configure retries
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

    this.transaction = new TransactionService(this.client);
    this.services = new ServicesService(this.client);
  }

  /**
   * Verify webhook signature
   */
  static webhook = {
    verifySignature(signature: string, payload: string, secret: string): boolean {
      const crypto = require('crypto');
      const hmac = crypto.createHmac('sha256', secret);
      const expectedSignature = hmac.update(payload).digest('hex');
      return signature === expectedSignature;
    },
  };
}
