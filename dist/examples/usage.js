"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importStar(require("../index"));
async function example() {
    // Initialize the SDK
    const sdk = new index_1.default({
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
    }
    catch (error) {
        if (error instanceof index_1.DexchangeError) {
            console.error('API Error:', error.message, error.code);
        }
        else {
            console.error('Error:', error);
        }
    }
}
