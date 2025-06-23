import { DexchangeClient } from '../index';

// Initialize the client
const client = new DexchangeClient({
  apiKey: 'VOTRE_CLE_API',
  // Optional: override base URL
  // baseUrl: 'https://api-m.dexchange.sn'
});

// Initialize a transaction
export async function initTransaction() {
  try {
    const response = await client.transaction.init({
      externalTransactionId: `ORDER-${Date.now()}`,
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
}

// Generate a merchant payment link
export async function createPaymentLink() {
  try {
    const response = await client.transaction.createMerchantPaymentLink({
      externalTransactionId: `ORDER-${Date.now()}`,
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
}

// Get account balance
export async function getBalance() {
  try {
    const response = await client.services.getBalance();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// Get available services
export async function getServices() {
  try {
    const response = await client.services.getServices();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// Example webhook handler
export function handleWebhook(signature: string, payload: string, secret: string) {
  const isValid = DexchangeClient.webhook.verifySignature(signature, payload, secret);
  if (isValid) {
    const data = JSON.parse(payload);
    console.log('Webhook data:', data);
  } else {
    console.error('Invalid webhook signature');
  }
}

// Run examples
if (require.main === module) {
  console.log('Running examples...');
  Promise.all([initTransaction(), createPaymentLink(), getBalance(), getServices()])
    .then(() => {
      console.log('All examples completed');
    })
    .catch(console.error);
}
