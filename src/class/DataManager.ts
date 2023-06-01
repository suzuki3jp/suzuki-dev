import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export class DataManager {
    private _paths: { config: string; key: string; cert: string };

    constructor() {
        this._paths = {
            config: resolve(__dirname, '../data/config.json'),
            key: resolve('/etc/letsencrypt/live/api.suzuki3jp.xyz/privkey.pem'),
            cert: resolve('/etc/letsencrypt/live/api.suzuki3jp.xyz/fullchain.pem'),
        };
    }

    /**
     * Configファイルを読み込む
     */
    getConfig(): ConfigJson {
        return JSON.parse(readFileSync(this._paths.config, 'utf-8'));
    }

    /**
     * Configファイルを上書き編集する
     */
    setConfig(data: Record<string, string | number | boolean | null>) {
        const newData = JSON.stringify(data, null, '\t');
        writeFileSync(this._paths.config, newData, 'utf-8');
    }

    /**
     * SSLのkeyファイルを読み込む
     */
    getKey(): string {
        return readFileSync(this._paths.key, 'utf-8');
    }

    /**
     * SSLのcertファイルを読み込む
     */
    getCert(): string {
        return readFileSync(this._paths.cert, 'utf-8');
    }
}

export interface ConfigJson {
    /**
     * APIをhttpsにするかどうか
     */
    isSecure: boolean;

    /**
     * API port.
     */
    port: number;

    /**
     * Support discord server invite link.
     */
    support_invite: string;
}
