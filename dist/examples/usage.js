"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhook = exports.getServices = exports.getBalance = exports.createPaymentLink = exports.initTransaction = void 0;
const index_1 = require("../index");
// Initialize the client
const client = new index_1.DexchangeClient({
    apiKey: 'VOTRE_CLE_API',
    // Optional: override base URL
    // baseUrl: 'https://api-m.dexchange.sn'
});
// Initialize a transaction
async function initTransaction() {
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
    }
    catch (error) {
        console.error(error);
    }
}
exports.initTransaction = initTransaction;
// Generate a merchant payment link
async function createPaymentLink() {
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
    }
    catch (error) {
        console.error(error);
    }
}
exports.createPaymentLink = createPaymentLink;
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
exports.getBalance = getBalance;
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
exports.getServices = getServices;
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
exports.handleWebhook = handleWebhook;
// Run examples
if (require.main === module) {
    console.log('Running examples...');
    Promise.all([initTransaction(), createPaymentLink(), getBalance(), getServices()])
        .then(() => {
        console.log('All examples completed');
    })
        .catch(console.error);
}
