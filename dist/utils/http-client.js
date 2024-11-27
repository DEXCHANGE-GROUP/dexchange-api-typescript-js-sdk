"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("../types");
const error_handler_1 = require("./error-handler");
class HttpClient {
    constructor(config) {
        this.client = axios_1.default.create({
            baseURL: config.baseURL || types_1.DEFAULT_BASE_URL,
            headers: {
                'Authorization': `Bearer ${config.apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        this.client.interceptors.response.use(response => response, (error) => (0, error_handler_1.handleApiError)(error));
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
exports.HttpClient = HttpClient;
