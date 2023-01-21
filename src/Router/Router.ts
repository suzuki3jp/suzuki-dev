import { Router } from 'express';

import { rank } from './routes/Rank';
import { uptime } from './routes/Uptime';
import { wins } from './routes/Wins';

export type Languages = 'en' | 'ja';
export const router = Router()
    .get('/api/rank/:name/:tag', rank)
    .get('/api/uptime/:id', uptime)
    .get('/api/wins/:name/:tag', wins);
