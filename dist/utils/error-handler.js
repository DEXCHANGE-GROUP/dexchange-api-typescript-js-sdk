"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexchangeError = void 0;
exports.handleApiError = handleApiError;
class DexchangeError extends Error {
    constructor(message, code, response) {
        super(message);
        this.code = code;
        this.response = response;
        this.name = 'DexchangeError';
    }
}
exports.DexchangeError = DexchangeError;
function handleApiError(error) {
    if (error.response) {
        const errorData = error.response.data;
        throw new DexchangeError(errorData.message, errorData.error, error.response.data);
    }
    if (error.request) {
        throw new DexchangeError('No response received from the server');
    }
    throw new DexchangeError('Error setting up the request');
}
