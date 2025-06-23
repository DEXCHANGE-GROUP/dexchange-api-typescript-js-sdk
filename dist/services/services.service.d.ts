import { AxiosInstance } from 'axios';
import { BalanceResponse, ServicesResponse } from '../types';
export declare class ServicesService {
    private readonly client;
    constructor(client: AxiosInstance);
    /**
     * Get current account balance
     */
    getBalance(): Promise<BalanceResponse>;
    /**
     * Get list of available payment services
     */
    getServices(): Promise<ServicesResponse>;
}
