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

describe('DexchangeSDK Transaction Tests', () => {
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

  describe('initTransaction', () => {
    it('should successfully initialize a transaction', async () => {
      const mockResponseData = {
        message: 'Transaction initialized successfully',
        transaction: {
          success: true,
          transactionId: 'test-123',
          externalTransactionId: '123456',
          transactionType: 'PAYMENT',
          amount: 1000,
          transactionFee: 100,
          number: '+221777777777',
          callBackURL: 'https://test-callback.com',
          successUrl: 'https://test-success.com',
          failureUrl: 'https://test-failure.com',
          status: 'pending',
          cashout_url: 'https://cashout.test.com',
          webhook: 'https://webhook.test.com'
        }
      };

      axiosInstance.post.mockResolvedValueOnce({ data: mockResponseData });

      const transactionData = {
        externalTransactionId: "123456",
        serviceCode: "TEST_SERVICE",
        amount: 1000,
        number: "+221777777777",
        callBackURL: "https://test-callback.com",
        successUrl: "https://test-success.com",
        failureUrl: "https://test-failure.com"
      };

      const result = await sdk.transaction.initTransaction(transactionData);

      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/transaction/init',
        transactionData
      );
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors correctly', async () => {
      const errorResponse = {
        response: {
          data: {
            error: 400,
            message: 'Invalid service code'
          },
          status: 400
        }
      };

      // Mock the error by using the stored error handler
      axiosInstance.post.mockImplementationOnce(() => {
        return Promise.reject(errorResponse).catch(axiosInstance._errorHandler);
      });

      const transactionData = {
        externalTransactionId: "123456",
        serviceCode: "INVALID_SERVICE",
        amount: 1000,
        number: "+221777777777",
        callBackURL: "https://test-callback.com",
        successUrl: "https://test-success.com",
        failureUrl: "https://test-failure.com"
      };

      try {
        await sdk.transaction.initTransaction(transactionData);
        throw new Error('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(DexchangeError);
        expect(error).toMatchObject({
          message: 'Invalid service code',
          code: 400,
          name: 'DexchangeError'
        });
      }
    });
  });

  describe('getPaymentLink', () => {
    it('should successfully get a payment link', async () => {
      const mockResponseData = {
        message: 'Payment link generated successfully',
        transaction: {
          success: true,
          transactionId: 'pay-123',
          PaymentUrl: 'https://pay.test.com/123',
          externalTransactionId: '123456',
          Status: 'PENDING'
        }
      };

      axiosInstance.post.mockResolvedValueOnce({ data: mockResponseData });

      const paymentData = {
        externalTransactionId: "123456",
        ItemName: "Test Product",
        ItemPrice: 1000,
        customData: "Test data",
        callBackURL: "https://test-callback.com",
        successUrl: "https://test-success.com",
        failureUrl: "https://test-failure.com"
      };

      const result = await sdk.transaction.getPaymentLink(paymentData);

      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/transaction/merchant/get-link',
        paymentData
      );
      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors when getting payment link', async () => {
      const errorResponse = {
        response: {
          data: {
            error: 400,
            message: 'Invalid item price'
          },
          status: 400
        }
      };

      axiosInstance.post.mockImplementationOnce(() => {
        return Promise.reject(errorResponse).catch(axiosInstance._errorHandler);
      });

      const paymentData = {
        externalTransactionId: "123456",
        ItemName: "Test Product",
        ItemPrice: -1000, // Invalid price
        customData: "Test data",
        callBackURL: "https://test-callback.com",
        successUrl: "https://test-success.com",
        failureUrl: "https://test-failure.com"
      };

      try {
        await sdk.transaction.getPaymentLink(paymentData);
        throw new Error('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(DexchangeError);
        expect(error).toMatchObject({
          message: 'Invalid item price',
          code: 400,
          name: 'DexchangeError'
        });
      }
    });
  });

  describe('getTransaction', () => {
    it('should successfully get transaction details', async () => {
      const mockResponseData = {
        message: 'Transaction details retrieved successfully',
        transaction: {
          success: true,
          transactionId: 'tx-123',
          externalTransactionId: '123456',
          amount: 1000,
          status: 'COMPLETED',
          createdAt: '2025-02-19T12:00:00Z',
          updatedAt: '2025-02-19T12:01:00Z'
        }
      };

      axiosInstance.get.mockResolvedValueOnce({ data: mockResponseData });

      const result = await sdk.transaction.getTransaction('tx-123');

      expect(axiosInstance.get).toHaveBeenCalledWith('/transaction/tx-123');
      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors when getting transaction details', async () => {
      const errorResponse = {
        response: {
          data: {
            error: 404,
            message: 'Transaction not found'
          },
          status: 404
        }
      };

      axiosInstance.get.mockImplementationOnce(() => {
        return Promise.reject(errorResponse).catch(axiosInstance._errorHandler);
      });

      try {
        await sdk.transaction.getTransaction('invalid-tx');
        throw new Error('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(DexchangeError);
        expect(error).toMatchObject({
          message: 'Transaction not found',
          code: 404,
          name: 'DexchangeError'
        });
      }
    });
  });

  describe('confirmWizallTransaction', () => {
    it('should successfully confirm Wizall transaction', async () => {
      const mockResponseData = {
        message: 'Transaction confirmed successfully',
        transaction: {
          success: true,
          amount: 1000,
          fee: 100,
          transactionId: 'wizall-123',
          externalTransactionId: '123456',
          Status: 'CONFIRMED'
        }
      };

      axiosInstance.post.mockResolvedValueOnce({ data: mockResponseData });

      const confirmData = {
        transactionId: 'wizall-123',
        otp: '123456'
      };

      const result = await sdk.transaction.confirmWizallTransaction(confirmData);

      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/transaction/confirm/wizall',
        confirmData
      );
      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors when confirming Wizall transaction', async () => {
      const errorResponse = {
        response: {
          data: {
            error: 400,
            message: 'Invalid OTP'
          },
          status: 400
        }
      };

      axiosInstance.post.mockImplementationOnce(() => {
        return Promise.reject(errorResponse).catch(axiosInstance._errorHandler);
      });

      const confirmData = {
        transactionId: 'wizall-123',
        otp: 'invalid-otp'
      };

      try {
        await sdk.transaction.confirmWizallTransaction(confirmData);
        throw new Error('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(DexchangeError);
        expect(error).toMatchObject({
          message: 'Invalid OTP',
          code: 400,
          name: 'DexchangeError'
        });
      }
    });
  });
});
