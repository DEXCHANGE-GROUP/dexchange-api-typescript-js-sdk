import DexchangeSDK from '../src';
import { DexchangeError } from '../src/utils/error-handler';
import axios from 'axios';

// Mock axios
jest.mock('axios', () => {
  const mockAxiosInstance = {
    interceptors: {
      response: {
        use: jest.fn((successFn, errorFn) => {
          // Store the error handler for use in mock responses
          mockAxiosInstance._errorHandler = errorFn;
        })
      }
    },
    post: jest.fn(),
    get: jest.fn(),
    _errorHandler: null as any
  };
  return {
    create: jest.fn(() => mockAxiosInstance)
  };
});

describe('DexchangeSDK Balance Tests', () => {
  let sdk: DexchangeSDK;
  let axiosInstance: any;

  const mockConfig = {
    apiKey: 'test-api-key',
    baseURL: 'https://api.test.com'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    sdk = new DexchangeSDK(mockConfig);
    axiosInstance = (axios.create as jest.Mock)();
  });

  describe('getBalance', () => {
    it('should successfully get balance', async () => {
      const mockResponseData = {
        message: 'Balance retrieved successfully',
        balance: {
          success: true,
          balance: 50000,
          currency: 'XOF',
          lastUpdate: '2025-02-19T12:00:00Z'
        }
      };

      axiosInstance.get.mockResolvedValueOnce({ data: mockResponseData });

      const result = await sdk.balance.getBalance();

      expect(axiosInstance.get).toHaveBeenCalledWith('/api-services/balance');
      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors when getting balance', async () => {
      const errorResponse = {
        response: {
          data: {
            error: 401,
            message: 'Invalid API key'
          },
          status: 401
        }
      };

      axiosInstance.get.mockImplementationOnce(() => {
        return Promise.reject(errorResponse).catch(axiosInstance._errorHandler);
      });

      try {
        await sdk.balance.getBalance();
        throw new Error('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(DexchangeError);
        expect(error).toMatchObject({
          message: 'Invalid API key',
          code: 401,
          name: 'DexchangeError'
        });
      }
    });

    it('should handle network errors', async () => {
      const networkError = {
        request: {},
        message: 'Network Error'
      };

      axiosInstance.get.mockImplementationOnce(() => {
        return Promise.reject(networkError).catch(axiosInstance._errorHandler);
      });

      try {
        await sdk.balance.getBalance();
        throw new Error('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(DexchangeError);
        expect(error).toMatchObject({
          message: 'No response received from the server',
          name: 'DexchangeError'
        });
      }
    });
  });
});
