// import packages
import express from 'express';
import { createServer as httpCreateServer, Server as HTTP } from 'http';
import { createServer as httpsCreateServer, Server as HTTPS } from 'https';

// import modules
import { DataManager } from '../class/DataManager';

export function setupServer(isSecure: true): HTTPS;
export function setupServer(isSecure: false): HTTP;
export function setupServer(isSecure: boolean): Servers {
    const DM = new DataManager();
    const app = express();

    if (isSecure) {
        return httpsCreateServer(
            {
                key: DM.getKey(),
                cert: DM.getCert(),
            },
            app
        );
    } else {
        return httpCreateServer(app);
    }
}

type Servers = HTTP | HTTPS;