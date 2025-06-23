import { DexchangeClient } from '../index';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TransactionService', () => {
  let client: DexchangeClient;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock axios.create to return a mocked instance
    mockedAxios.create.mockReturnValue(mockedAxios);

    // Initialize client
    client = new DexchangeClient({
      apiKey: 'test-api-key',
      baseUrl: 'https://api-m.dexchange.sn',
    });
  });

  describe('init', () => {
    it('should initialize a transaction', async () => {
      const mockResponse = {
        data: {
          message: 'Transaction initiated successfully',
          transaction: {
            success: true,
            transactionId: 'TID123',
            externalTransactionId: 'ORDER-123',
            transactionType: 'CASHOUT',
            amount: 1000,
            transactionFee: 20,
            status: 'PENDING',
            createdAt: '2024-03-20T10:30:00Z',
            updatedAt: '2024-03-20T10:30:00Z',
            number: '771234567',
            callBackURL: 'https://api.example.com/webhook',
            successUrl: 'https://example.com/success',
            failureUrl: 'https://example.com/failure',
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await client.transaction.init({
        externalTransactionId: 'ORDER-123',
        serviceCode: 'OM_SN',
        amount: 1000,
        number: '771234567',
        callBackURL: 'https://api.example.com/webhook',
        successUrl: 'https://example.com/success',
        failureUrl: 'https://example.com/failure',
      });

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/v1/transaction/init', {
        externalTransactionId: 'ORDER-123',
        serviceCode: 'OM_SN',
        amount: 1000,
        number: '771234567',
        callBackURL: 'https://api.example.com/webhook',
        successUrl: 'https://example.com/success',
        failureUrl: 'https://example.com/failure',
      });

      expect(result).toEqual(mockResponse.data);
    });

    it('should handle errors properly', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: {
            message: 'Invalid amount',
            success: false,
          },
        },
      };

      mockedAxios.post.mockRejectedValueOnce(errorResponse);

      let caughtError: any;
      try {
        await client.transaction.init({
          externalTransactionId: 'ORDER-123',
          serviceCode: 'OM_SN',
          amount: 100, // Invalid amount
          number: '771234567',
          callBackURL: 'https://api.example.com/webhook',
          successUrl: 'https://example.com/success',
          failureUrl: 'https://example.com/failure',
        });
      } catch (e) {
        caughtError = e;
      }

      expect(caughtError).toBeDefined();
      console.log('Caught error:', caughtError);
      expect(caughtError.response.data.message).toBe('Invalid amount');
    });
  });

  describe('getTransaction', () => {
    it('should fetch transaction details', async () => {
      const mockResponse = {
        data: {
          message: 'Transaction fetched successfully',
          transaction: {
            success: true,
            transactionId: 'TID123',
            externalTransactionId: 'ORDER-123',
            transactionType: 'CASHOUT',
            amount: 1000,
            transactionFee: 20,
            status: 'SUCCESS',
            createdAt: '2024-03-20T10:30:00Z',
            updatedAt: '2024-03-20T10:35:00Z',
            number: '771234567',
            callBackURL: 'https://api.example.com/webhook',
            successUrl: 'https://example.com/success',
            failureUrl: 'https://example.com/failure',
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await client.transaction.getTransaction('TID123');

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/transaction/TID123');
      expect(result).toEqual(mockResponse.data);
    });
  });

  // Legacy method tests
  describe('initCashout', () => {
    it('should initialize a CASHOUT transaction', async () => {
      const mockResponse = {
        data: {
          message: 'Transaction initiated successfully',
          transaction: {
            success: true,
            transactionId: 'TID123',
            externalTransactionId: 'ORDER-123',
            transactionType: 'CASHOUT',
            amount: 1000,
            transactionFee: 20,
            status: 'PENDING',
            createdAt: '2024-03-20T10:30:00Z',
            updatedAt: '2024-03-20T10:30:00Z',
            number: '771234567',
            callBackURL: 'https://api.example.com/webhook',
            successUrl: 'https://example.com/success',
            failureUrl: 'https://example.com/failure',
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await client.transaction.initCashout({
        externalTransactionId: 'ORDER-123',
        serviceCode: 'OM_SN',
        amount: 1000,
        number: '771234567',
        callBackURL: 'https://api.example.com/webhook',
        successUrl: 'https://example.com/success',
        failureUrl: 'https://example.com/failure',
      });

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/v1/transaction/init', {
        externalTransactionId: 'ORDER-123',
        serviceCode: 'OM_SN',
        amount: 1000,
        number: '771234567',
        callBackURL: 'https://api.example.com/webhook',
        successUrl: 'https://example.com/success',
        failureUrl: 'https://example.com/failure',
        transactionType: 'CASHOUT',
      });

      expect(result).toEqual(mockResponse.data);
    });
  });
});
