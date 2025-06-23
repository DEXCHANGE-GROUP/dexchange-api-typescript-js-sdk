export interface WebhookEvent {
    id: string;
    externalTransactionId: string;
    transactionType: string;
    AMOUNT: number;
    FEE: number;
    PHONE_NUMBER: string;
    STATUS: string;
    CUSTOM_DATA: string;
    COMPLETED_AT: string;
    BALANCE: number;
    PREVIOUS_BALANCE: number;
    CURRENT_BALANCE: number;
}
