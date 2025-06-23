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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexchangeClient = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const transaction_service_1 = require("./services/transaction.service");
const services_service_1 = require("./services/services.service");
__exportStar(require("./types"), exports);
class DexchangeClient {
    constructor(config) {
        this.client = axios_1.default.create({
            baseURL: config.baseUrl || 'https://api-m.dexchange.sn',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.apiKey}`,
            },
        });
        // Configure retries
        (0, axios_retry_1.default)(this.client, {
            retries: 3,
            retryDelay: (retryCount) => {
                return retryCount * 1000; // Time interval between retries (1s, 2s, 3s)
            },
            retryCondition: (error) => {
                var _a;
                // Retry on network errors or 5xx server errors
                return (axios_retry_1.default.isNetworkOrIdempotentRequestError(error) ||
                    (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) ? error.response.status >= 500 : false));
            },
        });
        this.transaction = new transaction_service_1.TransactionService(this.client);
        this.services = new services_service_1.ServicesService(this.client);
    }
}
exports.DexchangeClient = DexchangeClient;
/**
 * Verify webhook signature
 */
DexchangeClient.webhook = {
    verifySignature(signature, payload, secret) {
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', secret);
        const expectedSignature = hmac.update(payload).digest('hex');
        return signature === expectedSignature;
    },
};
