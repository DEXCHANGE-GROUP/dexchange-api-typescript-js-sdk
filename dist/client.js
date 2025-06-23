"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexchangeClient = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const transaction_service_1 = require("./services/transaction.service");
const services_service_1 = require("./services/services.service");
class DexchangeClient {
    constructor(config) {
        this.client = axios_1.default.create({
            baseURL: config.baseUrl || 'https://api-m.dexchange.sn',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.apiKey}`,
            },
        });
        // Configure retry behavior
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
        // Add error interceptor
        this.client.interceptors.response.use((response) => response, (error) => {
            if (error.response) {
                const { data } = error.response;
                throw new Error(data.message || 'Une erreur est survenue');
            }
            throw error;
        });
        this.transaction = new transaction_service_1.TransactionService(this.client);
        this.services = new services_service_1.ServicesService(this.client);
    }
    async get(url) {
        const response = await this.client.get(url);
        return response.data;
    }
    async post(url, data) {
        const response = await this.client.post(url, data);
        return response.data;
    }
}
exports.DexchangeClient = DexchangeClient;
