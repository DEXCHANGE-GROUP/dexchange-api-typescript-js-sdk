"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
class TransactionService {
    constructor(client) {
        this.client = client;
    }
    /**
     * Initialize a new transaction
     * @param data Transaction details
     */
    async init(data) {
        const response = await this.client.post('/api/v1/transaction/init', data);
        return response.data;
    }
    /**
     * Confirm a Wizall transaction using OTP
     * @param data Confirmation details including OTP
     */
    async confirmWizall(data) {
        const response = await this.client.post('/api/v1/transaction/confirm/wizall', data);
        return response.data;
    }
    /**
     * Get transaction details
     * @param transactionId Transaction ID
     */
    async getTransaction(transactionId) {
        const response = await this.client.get(`/api/v1/transaction/${transactionId}`);
        return response.data;
    }
    /**
     * Generate a merchant payment link
     * @param data Merchant transaction details
     */
    async createMerchantPaymentLink(data) {
        const response = await this.client.post('/transaction/merchant/get-link', data);
        return response.data;
    }
    /**
     * Get merchant transaction details
     * @param transactionId Merchant transaction ID
     */
    async getMerchantTransaction(transactionId) {
        const response = await this.client.get(`/transaction/merchant/${transactionId}`);
        return response.data;
    }
    // Legacy methods maintained for backward compatibility
    async initCashout(data) {
        const response = await this.client.post('/api/v1/transaction/init', {
            ...data,
            transactionType: 'CASHOUT',
        });
        return response.data;
    }
    async initCashin(data) {
        const response = await this.client.post('/api/v1/transaction/init', {
            ...data,
            transactionType: 'CASHIN',
        });
        return response.data;
    }
    async initAirtime(data) {
        const response = await this.client.post('/api/v1/transaction/init', {
            ...data,
            transactionType: 'AIRTIME',
        });
        return response.data;
    }
    async getStatus(transactionId) {
        return this.getTransaction(transactionId);
    }
    /**
     * Rembourser une transaction
     * @param transactionId ID de la transaction
     */
    async refund(transactionId) {
        const response = await this.client.post(`/transaction/refund/${transactionId}`);
        return response.data;
    }
}
exports.TransactionService = TransactionService;
