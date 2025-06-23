declare module 'axios-retry' {
  import { AxiosInstance, AxiosError } from 'axios';

  export interface IAxiosRetryConfig {
    retries?: number;
    retryDelay?: (retryCount: number, error: AxiosError) => number;
    retryCondition?: (error: AxiosError) => boolean;
    shouldResetTimeout?: boolean;
    onRetry?: (retryCount: number, error: AxiosError, requestConfig: any) => void;
  }

  function axiosRetry(axios: AxiosInstance, config?: IAxiosRetryConfig): void;

  namespace axiosRetry {
    export function isNetworkOrIdempotentRequestError(error: AxiosError): boolean;
  }

  export default axiosRetry;
}
