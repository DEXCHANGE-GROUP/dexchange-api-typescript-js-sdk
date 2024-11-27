export interface BaseTransactionRequest {
    externalTransactionId: string;
    callBackURL: string;
    successUrl: string;
    failureUrl: string;
}
export interface TransactionInitRequest extends BaseTransactionRequest {
    serviceCode: string;
    amount: number;
    number: string;
}
export interface PaymentLinkRequest extends BaseTransactionRequest {
    ItemName: string;
    ItemPrice: number;
    customData: string;
}
export interface WizallConfirmRequest {
    transactionId: string;
    otp: string;
}
