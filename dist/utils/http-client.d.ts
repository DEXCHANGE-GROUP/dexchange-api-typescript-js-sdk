import { DexchangeConfig } from '../types';
export declare class HttpClient {
    private client;
    constructor(config: DexchangeConfig);
    private setupInterceptors;
    protected get<T>(url: string): Promise<T>;
    protected post<T>(url: string, data: any): Promise<T>;
}
