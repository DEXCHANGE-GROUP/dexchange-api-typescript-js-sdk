"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// Initialize the SDK
const client = new index_1.DexchangeClient({
    apiKey: 'YOUR_API_KEY',
    // Optional: override base URL
    // baseUrl: 'https://api-m.dexchange.sn'
});
// Initialize a transaction
async function initTransaction() {
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
    }
    catch (error) {
        console.error(error);
    }
}
// Generate a merchant payment link
async function createPaymentLink() {
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
    }
    catch (error) {
        console.error(error);
    }
}
// Get account balance
async function getBalance() {
    try {
        const response = await client.services.getBalance();
        console.log(response);
    }
    catch (error) {
        console.error(error);
    }
}
// Get available services
async function getServices() {
    try {
        const response = await client.services.getServices();
        console.log(response);
    }
    catch (error) {
        console.error(error);
    }
}
// Example webhook handler
function handleWebhook(signature, payload, secret) {
    const isValid = index_1.DexchangeClient.webhook.verifySignature(signature, payload, secret);
    if (isValid) {
        const data = JSON.parse(payload);
        console.log('Webhook data:', data);
    }
    else {
        console.error('Invalid webhook signature');
    }
}
