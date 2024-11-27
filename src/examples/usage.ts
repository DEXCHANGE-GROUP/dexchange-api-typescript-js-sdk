import DexchangeSDK, { DexchangeError } from '../index';

async function example() {
  // Initialize the SDK
  const sdk = new DexchangeSDK({
    apiKey: 'your-api-key-here'
  });

  try {
    // Initialize a transaction
    const transactionResult = await sdk.transaction.initTransaction({
      externalTransactionId: "123456",
      serviceCode: "SERVICE_CODE",
      amount: 1000,
      number: "+221xxxxxxxxx",
      callBackURL: "https://your-callback-url.com",
      successUrl: "https://your-success-url.com",
      failureUrl: "https://your-failure-url.com"
    });
    console.log('Transaction initialized:', transactionResult);

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
    console.log('Payment link:', paymentLink);

    // Get balance
    const balance = await sdk.balance.getBalance();
    console.log('Balance:', balance);

  } catch (error) {
    if (error instanceof DexchangeError) {
      console.error('API Error:', (error as DexchangeError).message, (error as DexchangeError).code);
    } else {
      console.error('Error:', error);
    }
  }
}