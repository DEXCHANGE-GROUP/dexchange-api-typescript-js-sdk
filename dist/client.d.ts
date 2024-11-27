import { DexchangeConfig } from './config';
export declare class DexchangeClient {
    private client;
    constructor(config: DexchangeConfig);
    protected get<T>(url: string): Promise<T>;
    protected post<T>(url: string, data: any): Promise<T>;
}
