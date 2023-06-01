"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class DataManager {
    _paths;
    constructor() {
        this._paths = {
            config: (0, path_1.resolve)(__dirname, '../data/config.json'),
            key: (0, path_1.resolve)('/etc/letsencrypt/live/api.suzuki3jp.xyz/privkey.pem'),
            cert: (0, path_1.resolve)('/etc/letsencrypt/live/api.suzuki3jp.xyz/fullchain.pem'),
        };
    }
    /**
     * Configファイルを読み込む
     */
    getConfig() {
        return JSON.parse((0, fs_1.readFileSync)(this._paths.config, 'utf-8'));
    }
    /**
     * Configファイルを上書き編集する
     */
    setConfig(data) {
        const newData = JSON.stringify(data, null, '\t');
        (0, fs_1.writeFileSync)(this._paths.config, newData, 'utf-8');
    }
    /**
     * SSLのkeyファイルを読み込む
     */
    getKey() {
        return (0, fs_1.readFileSync)(this._paths.key, 'utf-8');
    }
    /**
     * SSLのcertファイルを読み込む
     */
    getCert() {
        return (0, fs_1.readFileSync)(this._paths.cert, 'utf-8');
    }
}
exports.DataManager = DataManager;
