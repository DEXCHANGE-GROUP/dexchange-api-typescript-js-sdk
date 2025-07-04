import { Config } from './types';
import { TransactionService } from './services/transaction.service';
import { ServicesService } from './services/services.service';
export * from './types';
export declare class DexchangeClient {
    private readonly client;
    readonly transaction: TransactionService;
    readonly services: ServicesService;
    constructor(config: Config);
    /**
     * Verify webhook signature
     */
    static webhook: {
        verifySignature(signature: string, payload: string, secret: string): boolean;
    };
}
