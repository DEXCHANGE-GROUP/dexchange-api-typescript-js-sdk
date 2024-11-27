import { AxiosError } from 'axios';
import { ErrorResponse } from '../types';
export declare class DexchangeError extends Error {
    code?: number | undefined;
    response?: any | undefined;
    constructor(message: string, code?: number | undefined, response?: any | undefined);
}
export declare function handleApiError(error: AxiosError<ErrorResponse>): never;
