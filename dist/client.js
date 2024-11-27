"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexchangeClient = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
class DexchangeClient {
    constructor(config) {
        this.client = axios_1.default.create({
            baseURL: config.baseURL || config_1.DEFAULT_BASE_URL,
            headers: {
                'Authorization': `Bearer ${config.token}`,
                'Content-Type': 'application/json',
            },
        });
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
