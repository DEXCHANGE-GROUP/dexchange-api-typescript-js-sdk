"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceService = void 0;
const http_client_1 = require("../utils/http-client");
class BalanceService extends http_client_1.HttpClient {
    async getBalance() {
        return this.get('/api-services/balance');
    }
}
exports.BalanceService = BalanceService;
