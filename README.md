# DEXCHANGE SDK

A TypeScript SDK for interacting with the DEXCHANGE API.

## Installation

```bash
npm install dexchange-sdk
```

## Usage

```typescript
import DexchangeSDK from 'dexchange-sdk';

// Initialize the SDK
const sdk = new DexchangeSDK({
  apiKey: 'your-api-key-here'
});

// Initialize a transaction
const transaction = await sdk.transaction.initTransaction({
  externalTransactionId: "123456",
  serviceCode: "SERVICE_CODE",
  amount: 1000,
  number: "+221xxxxxxxxx",
  callBackURL: "https://your-callback-url.com",
  successUrl: "https://your-success-url.com",
  failureUrl: "https://your-failure-url.com"
});

// Get a payment link
const paymentLink = await sdk.transaction.getPaymentLink({
  externalTransactionId: "123456",
  ItemName: "Product Name",
  ItemPrice: 1000,
  customData: "Custom data here",
  callBackURL: "https://your-callback-url.com",
  successUrl: "https://your-success-url.com",
  failureUrl: "https://your-failure-url.com"
});

// Get balance
const balance = await sdk.balance.getBalance();

// Get transaction details
const transactionDetails = await sdk.transaction.getTransaction("transactionId");

// Confirm Wizall transaction
const wizallConfirmation = await sdk.transaction.confirmWizallTransaction({
  transactionId: "transactionId",
  otp: "123456"
});
```

## Error Handling

The SDK provides a custom error class `DexchangeError` for better error handling:

```typescript
try {
  const transaction = await sdk.transaction.initTransaction({...});
} catch (error) {
  if (error instanceof DexchangeSDK.DexchangeError) {
    console.error('API Error:', error.message, error.code);
  } else {
    console.error('Error:', error);
  }
}
```

## Types

The SDK includes TypeScript definitions for all request and response types. Import them as needed:

```typescript
import { 
  TransactionInitRequest, 
  TransactionInitResponse,
  PaymentLinkRequest,
  PaymentLinkResponse,
  DexchangeError
} from 'dexchange-sdk';
```