import { Router } from 'express';

import { rank } from './routes/Rank';
import { uptime } from './routes/Uptime';
import { wins } from './routes/Wins';
import { support } from './routes/Support';

export type Languages = 'en' | 'ja';
export const router = Router()
    .get('/support', support)
    .get('/rank/:name/:tag', rank)
    .get('/uptime/:id', uptime)
    .get('/wins/:name/:tag', wins);
