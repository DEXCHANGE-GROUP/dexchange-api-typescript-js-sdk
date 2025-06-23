import { AxiosInstance } from 'axios';
import { TransactionInitRequest, WizallConfirmationRequest, MerchantTransactionRequest, TransactionInitResponse, WizallConfirmationResponse, MerchantTransactionResponse, MerchantTransactionStatusResponse, CashoutRequest, CashinRequest, AirtimeRequest, BaseTransactionResponse, TransactionStatusResponse } from '../types';
export declare class TransactionService {
    private readonly client;
    constructor(client: AxiosInstance);
    /**
     * Initialize a new transaction
     * @param data Transaction details
     */
    init(data: TransactionInitRequest): Promise<TransactionInitResponse>;
    /**
     * Confirm a Wizall transaction using OTP
     * @param data Confirmation details including OTP
     */
    confirmWizall(data: WizallConfirmationRequest): Promise<WizallConfirmationResponse>;
    /**
     * Get transaction details
     * @param transactionId Transaction ID
     */
    getTransaction(transactionId: string): Promise<TransactionStatusResponse>;
    /**
     * Generate a merchant payment link
     * @param data Merchant transaction details
     */
    createMerchantPaymentLink(data: MerchantTransactionRequest): Promise<MerchantTransactionResponse>;
    /**
     * Get merchant transaction details
     * @param transactionId Merchant transaction ID
     */
    getMerchantTransaction(transactionId: string): Promise<MerchantTransactionStatusResponse>;
    initCashout(data: CashoutRequest): Promise<BaseTransactionResponse>;
    initCashin(data: CashinRequest): Promise<BaseTransactionResponse>;
    initAirtime(data: AirtimeRequest): Promise<BaseTransactionResponse>;
    getStatus(transactionId: string): Promise<TransactionStatusResponse>;
    /**
     * Rembourser une transaction
     * @param transactionId ID de la transaction
     */
    refund(transactionId: string): Promise<BaseTransactionResponse>;
}
