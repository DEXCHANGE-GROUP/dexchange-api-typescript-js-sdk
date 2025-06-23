export declare function initTransaction(): Promise<void>;
export declare function createPaymentLink(): Promise<void>;
export declare function getBalance(): Promise<void>;
export declare function getServices(): Promise<void>;
export declare function handleWebhook(signature: string, payload: string, secret: string): void;
