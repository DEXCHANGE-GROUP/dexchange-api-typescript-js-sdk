import { HttpClient } from '../utils/http-client';
import { TransactionInitRequest, TransactionInitResponse, PaymentLinkRequest, PaymentLinkResponse, TransactionDetailsResponse, WizallConfirmRequest, WizallConfirmResponse } from '../types';
export declare class TransactionService extends HttpClient {
    initTransaction(data: TransactionInitRequest): Promise<TransactionInitResponse>;
    getPaymentLink(data: PaymentLinkRequest): Promise<PaymentLinkResponse>;
    getTransaction(transactionId: string): Promise<TransactionDetailsResponse>;
    confirmWizallTransaction(data: WizallConfirmRequest): Promise<WizallConfirmResponse>;
}
