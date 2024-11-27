import { HttpClient } from '../utils/http-client';
import {
  TransactionInitRequest,
  TransactionInitResponse,
  PaymentLinkRequest,
  PaymentLinkResponse,
  TransactionDetailsResponse,
  WizallConfirmRequest,
  WizallConfirmResponse,
} from '../types';

export class TransactionService extends HttpClient {
  async initTransaction(data: TransactionInitRequest): Promise<TransactionInitResponse> {
    return this.post<TransactionInitResponse>('/transaction/init', data);
  }

  async getPaymentLink(data: PaymentLinkRequest): Promise<PaymentLinkResponse> {
    return this.post<PaymentLinkResponse>('/transaction/merchant/get-link', data);
  }

  async getTransaction(transactionId: string): Promise<TransactionDetailsResponse> {
    return this.get<TransactionDetailsResponse>(`/transaction/${transactionId}`);
  }

  async confirmWizallTransaction(data: WizallConfirmRequest): Promise<WizallConfirmResponse> {
    return this.post<WizallConfirmResponse>('/transaction/confirm/wizall', data);
  }
}