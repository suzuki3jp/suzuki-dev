import { Router } from 'express';

import { rank } from './routes/Rank';
import { uptime } from './routes/Uptime';

export type Languages = 'en' | 'ja';
export const router = Router().get('/api/rank/:name/:tag', rank).get('/api/uptime/:id', uptime);
