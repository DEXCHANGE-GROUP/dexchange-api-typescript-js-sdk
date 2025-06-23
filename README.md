# DEXCHANGE API TypeScript/JavaScript SDK

Official TypeScript/JavaScript SDK for the DEXCHANGE API. This SDK provides a simple and elegant way to interact with DEXCHANGE's payment services.

## Installation

```bash
npm install dexchange-api-sdk
# or
yarn add dexchange-api-sdk
```

## Quick Start

```typescript
import { DexchangeClient } from 'dexchange-api-sdk';

const client = new DexchangeClient({
  apiKey: 'your_api_key',
  // Optional: override base URL
  // baseUrl: 'https://api-m.dexchange.sn'
});

// Initialize a transaction
const initTransaction = async () => {
  try {
    const response = await client.transaction.init({
      externalTransactionId: 'ORDER-123',
      serviceCode: 'OM_SN',
      amount: 1000,
      number: '771234567',
      callBackURL: 'https://your-domain.com/callback',
      successUrl: 'https://your-domain.com/success',
      failureUrl: 'https://your-domain.com/failure',
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// Generate a merchant payment link
const createPaymentLink = async () => {
  try {
    const response = await client.transaction.createMerchantPaymentLink({
      externalTransactionId: 'ORDER-123',
      ItemName: 'Premium T-shirt',
      ItemPrice: 5000,
      ClientName: 'John Doe',
      ClientPhone: '771234567',
      Email: 'client@example.com',
      callBackURL: 'https://your-domain.com/callback',
      successUrl: 'https://your-domain.com/success',
      failureUrl: 'https://your-domain.com/failure',
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// Get account balance
const getBalance = async () => {
  try {
    const response = await client.services.getBalance();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// Get available services
const getServices = async () => {
  try {
    const response = await client.services.getServices();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
```

## Available Services

### Transaction Service

- `init(data)` - Initialize a new transaction
- `confirmWizall(data)` - Confirm a Wizall transaction with OTP
- `getTransaction(transactionId)` - Get transaction details
- `createMerchantPaymentLink(data)` - Generate a merchant payment link
- `getMerchantTransaction(transactionId)` - Get merchant transaction details

### Services

- `getBalance()` - Get current account balance
- `getServices()` - Get list of available payment services

### Legacy Methods (Backward Compatibility)

The following methods are maintained for backward compatibility:

- `initCashout(data)`
- `initCashin(data)`
- `initAirtime(data)`
- `getStatus(transactionId)`

## Error Handling

The SDK throws errors for various scenarios including network errors, API errors, and validation errors. Always wrap API calls in try-catch blocks:

```typescript
try {
  const response = await client.transaction.init({
    // ... transaction details
  });
} catch (error) {
  if (error.response) {
    // The request was made and the server responded with an error
    console.error(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received');
  } else {
    // Something happened in setting up the request
    console.error('Error:', error.message);
  }
}
```

## TypeScript Support

This SDK is written in TypeScript and includes type definitions for all requests and responses. You get full IntelliSense support in compatible IDEs.

## Documentation

For detailed API documentation, visit [https://docs-api.dexchange.sn](https://docs-api.dexchange.sn)

## License

MIT
