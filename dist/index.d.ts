import { DexchangeConfig } from './types';
import { TransactionService } from './services/transaction';
import { BalanceService } from './services/balance';
import { DexchangeError } from './utils/error-handler';
export * from './types';
export * from './utils/error-handler';
export declare class DexchangeSDK {
    transaction: TransactionService;
    balance: BalanceService;
    static DexchangeError: typeof DexchangeError;
    constructor(config: DexchangeConfig);
}
export default DexchangeSDK;
