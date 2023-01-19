// import packages
import express from 'express';
import type { Express } from 'express';
import { createServer as httpCreateServer, Server as HTTP } from 'http';
import { createServer as httpsCreateServer, Server as HTTPS } from 'https';

// import modules
import { DataManager } from '../class/DataManager';

export function setupServer(isSecure: boolean): { app: Express; server: Servers } {
    const DM = new DataManager();
    const app = express();

    if (isSecure) {
        return {
            app,
            server: httpsCreateServer(
                {
                    key: DM.getKey(),
                    cert: DM.getCert(),
                },
                app
            ),
        };
    } else {
        return {
            app,
            server: httpCreateServer(app),
        };
    }
}

type Servers = HTTP | HTTPS;
