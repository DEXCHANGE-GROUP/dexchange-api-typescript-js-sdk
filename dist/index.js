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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexchangeSDK = void 0;
const transaction_1 = require("./services/transaction");
const balance_1 = require("./services/balance");
const error_handler_1 = require("./utils/error-handler");
__exportStar(require("./types"), exports);
__exportStar(require("./utils/error-handler"), exports);
class DexchangeSDK {
    constructor(config) {
        this.transaction = new transaction_1.TransactionService(config);
        this.balance = new balance_1.BalanceService(config);
    }
}
exports.DexchangeSDK = DexchangeSDK;
DexchangeSDK.DexchangeError = error_handler_1.DexchangeError;
exports.default = DexchangeSDK;
