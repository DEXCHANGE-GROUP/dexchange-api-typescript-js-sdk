import { DexchangeConfig } from './types';
import { TransactionService } from './services/transaction';
import { BalanceService } from './services/balance';
import { DexchangeError } from './utils/error-handler';

export * from './types';
export * from './utils/error-handler';

export class DexchangeSDK {
  public transaction: TransactionService;
  public balance: BalanceService;
  public static DexchangeError = DexchangeError;

  constructor(config: DexchangeConfig) {
    this.transaction = new TransactionService(config);
    this.balance = new BalanceService(config);
  }
}

export default DexchangeSDK;