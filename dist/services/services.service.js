"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
class ServicesService {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get current account balance
     */
    async getBalance() {
        const response = await this.client.get('/api/v1/api-services/balance');
        return response.data;
    }
    /**
     * Get list of available payment services
     */
    async getServices() {
        const response = await this.client.get('/api/v1/api-services/services');
        return response.data;
    }
}
exports.ServicesService = ServicesService;
