// Configuration
export interface Config {
  apiKey: string;
  baseUrl?: string;
}

// Error Types
export interface Error {
  message: string[] | string;
  success: false;
}

// Transaction Types
export interface BaseTransactionDetails {
  success: boolean;
  transactionId: string;
  externalTransactionId: string;
  transactionType: string;
  amount: number;
  transactionFee: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  number: string;
  callBackURL: string;
  successUrl: string;
  failureUrl: string;
  cashout_url?: string;
  webhook?: string;
}

export interface TransactionInitRequest {
  externalTransactionId: string;
  serviceCode: string;
  amount: number;
  number: string;
  callBackURL: string;
  successUrl: string;
  failureUrl: string;
}

export interface TransactionInitResponse {
  message: string;
  transaction: BaseTransactionDetails;
}

export interface WizallConfirmationRequest {
  transactionId: string;
  otp: string;
}

export interface WizallConfirmationResponse {
  success: boolean;
  message: string;
  transaction: BaseTransactionDetails;
}

// Merchant Types
export interface MerchantTransactionRequest {
  externalTransactionId: string;
  ItemName: string;
  ItemPrice: number;
  customData?: string;
  callBackURL: string;
  successUrl: string;
  failureUrl: string;
  ClientName: string;
  ClientPhone: string;
  Email: string;
}

export interface MerchantTransactionResponse {
  success: boolean;
  transactionId: string;
  PaymentUrl: string;
  externalTransactionId: string;
  Status: string;
}

export interface MerchantTransactionDetails {
  Merchant: string;
  ItemName: string;
  Amount: number;
  Number: string;
  Status: string;
  Initiated_at: string;
  Completed_at: string | null;
  SuccessUrl: string;
}

export interface MerchantTransactionStatusResponse {
  message: string;
  transaction: MerchantTransactionDetails;
}

// Balance Types
export interface BalanceDetails {
  success: boolean;
  balance: number;
  currency: string;
  lastUpdate: string;
}

export interface BalanceResponse {
  balance: BalanceDetails;
}

// Services Types
export interface Service {
  serviceName: string;
  serviceCode: string;
  serviceType: 'MOBILEMONEY' | 'AIRTIME';
  country: 'SN' | 'CI' | 'ML' | 'CM';
}

export interface ServicesResponse {
  services: Service[];
}

// Legacy Types
export type BaseTransactionResponse = TransactionInitResponse;
export type TransactionStatusResponse = TransactionInitResponse;
export interface CashoutRequest extends TransactionInitRequest {}
export interface CashinRequest extends TransactionInitRequest {}
export interface AirtimeRequest extends TransactionInitRequest {}
