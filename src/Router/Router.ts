import { Router } from 'express';

import { rank } from './routes/Rank';

export type Languages = 'en' | 'ja';
export const router = Router().get('/api/rank/:name/:tag', rank);
