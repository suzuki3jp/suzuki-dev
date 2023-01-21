"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupServer = void 0;
// import packages
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const https_1 = require("https");
// import modules
const DataManager_1 = require("../class/DataManager");
function setupServer(isSecure) {
    const DM = new DataManager_1.DataManager();
    const app = (0, express_1.default)();
    if (isSecure) {
        return {
            app,
            server: (0, https_1.createServer)({
                key: DM.getKey(),
                cert: DM.getCert(),
            }, app),
        };
    }
    else {
        return {
            app,
            server: (0, http_1.createServer)(app),
        };
    }
}
exports.setupServer = setupServer;
