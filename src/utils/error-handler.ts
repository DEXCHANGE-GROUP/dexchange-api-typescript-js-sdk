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
    throw new DexchangeError(
      errorData.message,
      errorData.error,
      error.response.data
    );
  }
  
  if (error.request) {
    throw new DexchangeError('No response received from the server');
  }
  
  throw new DexchangeError('Error setting up the request');
}