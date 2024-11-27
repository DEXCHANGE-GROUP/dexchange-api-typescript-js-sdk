export interface BaseResponse {
  message: string;
}

export interface BaseTransactionResponse extends BaseResponse {
  transaction: {
    success: boolean;
    transactionId: string;
    externalTransactionId: string;
    Status: string;
  };
}

export interface TransactionInitResponse extends BaseResponse {
  transaction: {
    success: boolean;
    transactionId: string;
    externalTransactionId: string;
    transactionType: string;
    amount: number;
    transactionFee: number;
    number: string;
    callBackURL: string;
    successUrl: string;
    failureUrl: string;
    status: string;
    cashout_url: string;
    webhook: string;
  };
}

export interface PaymentLinkResponse extends BaseResponse {
  transaction: {
    success: boolean;
    transactionId: string;
    PaymentUrl: string;
    externalTransactionId: string;
    Status: string;
  };
}

export interface BalanceResponse extends BaseResponse {
  balance: {
    success: boolean;
    balance: number;
    currency: string;
    lastUpdate: string;
  };
}

export interface TransactionDetailsResponse extends BaseResponse {
  transaction: {
    ServiceName: string;
    ServiceCode: string;
    Amount: number;
    Number: string;
    Status: string;
    Initiated_at: string;
    Completed_at: string;
  };
}

export interface WizallConfirmResponse extends BaseResponse {
  transaction: {
    success: boolean;
    amount: number;
    fee: number;
    transactionId: string;
    externalTransactionId: string;
    Status: string;
  };
}

export interface ErrorResponse {
  error: number;
  message: string;
}