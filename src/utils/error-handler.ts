import { AxiosError } from 'axios';
import { ErrorResponse } from '../types';

export class DexchangeError extends Error {
  constructor(
    message: string,
    public code?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'DexchangeError';
  }
}

export function handleApiError(error: AxiosError<ErrorResponse>): never {
  if (error.response) {
    const errorData = error.response.data;
    const dexError = new DexchangeError(
      errorData.message || 'An error occurred',
      errorData.error,
      error.response.data
    );
    throw dexError;
  }
  
  if (error.request) {
    throw new DexchangeError('No response received from the server');
  }
  
  throw new DexchangeError('Error setting up the request');
}