import { AxiosInstance } from 'axios';
import {
  TransactionInitRequest,
  WizallConfirmationRequest,
  MerchantTransactionRequest,
  TransactionInitResponse,
  WizallConfirmationResponse,
  MerchantTransactionResponse,
  MerchantTransactionStatusResponse,
  // Legacy types
  CashoutRequest,
  CashinRequest,
  AirtimeRequest,
  BaseTransactionResponse,
  TransactionStatusResponse,
} from '../types';

export class TransactionService {
  constructor(private readonly client: AxiosInstance) {}

  /**
   * Initialize a new transaction
   * @param data Transaction details
   */
  async init(data: TransactionInitRequest): Promise<TransactionInitResponse> {
    const response = await this.client.post('/api/v1/transaction/init', data);
    return response.data;
  }

  /**
   * Confirm a Wizall transaction using OTP
   * @param data Confirmation details including OTP
   */
  async confirmWizall(data: WizallConfirmationRequest): Promise<WizallConfirmationResponse> {
    const response = await this.client.post('/api/v1/transaction/confirm/wizall', data);
    return response.data;
  }

  /**
   * Get transaction details
   * @param transactionId Transaction ID
   */
  async getTransaction(transactionId: string): Promise<TransactionStatusResponse> {
    const response = await this.client.get(`/api/v1/transaction/${transactionId}`);
    return response.data;
  }

  /**
   * Generate a merchant payment link
   * @param data Merchant transaction details
   */
  async createMerchantPaymentLink(
    data: MerchantTransactionRequest
  ): Promise<MerchantTransactionResponse> {
    const response = await this.client.post('/transaction/merchant/get-link', data);
    return response.data;
  }

  /**
   * Get merchant transaction details
   * @param transactionId Merchant transaction ID
   */
  async getMerchantTransaction(transactionId: string): Promise<MerchantTransactionStatusResponse> {
    const response = await this.client.get(`/transaction/merchant/${transactionId}`);
    return response.data;
  }

  // Legacy methods maintained for backward compatibility
  async initCashout(data: CashoutRequest): Promise<BaseTransactionResponse> {
    const response = await this.client.post('/api/v1/transaction/init', {
      ...data,
      transactionType: 'CASHOUT',
    });
    return response.data;
  }

  async initCashin(data: CashinRequest): Promise<BaseTransactionResponse> {
    const response = await this.client.post('/api/v1/transaction/init', {
      ...data,
      transactionType: 'CASHIN',
    });
    return response.data;
  }

  async initAirtime(data: AirtimeRequest): Promise<BaseTransactionResponse> {
    const response = await this.client.post('/api/v1/transaction/init', {
      ...data,
      transactionType: 'AIRTIME',
    });
    return response.data;
  }

  async getStatus(transactionId: string): Promise<TransactionStatusResponse> {
    return this.getTransaction(transactionId);
  }

  /**
   * Rembourser une transaction
   * @param transactionId ID de la transaction
   */
  async refund(transactionId: string): Promise<BaseTransactionResponse> {
    const response = await this.client.post(`/transaction/refund/${transactionId}`);
    return response.data;
  }
}
