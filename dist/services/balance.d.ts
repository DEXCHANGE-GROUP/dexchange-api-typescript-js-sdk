import { HttpClient } from '../utils/http-client';
import { BalanceResponse } from '../types';
export declare class BalanceService extends HttpClient {
    getBalance(): Promise<BalanceResponse>;
}
