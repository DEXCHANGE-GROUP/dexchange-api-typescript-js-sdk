"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const http_client_1 = require("../utils/http-client");
class TransactionService extends http_client_1.HttpClient {
    async initTransaction(data) {
        return this.post('/transaction/init', data);
    }
    async getPaymentLink(data) {
        return this.post('/transaction/merchant/get-link', data);
    }
    async getTransaction(transactionId) {
        return this.get(`/transaction/${transactionId}`);
    }
    async confirmWizallTransaction(data) {
        return this.post('/transaction/confirm/wizall', data);
    }
}
exports.TransactionService = TransactionService;
