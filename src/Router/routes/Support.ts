import type { Request, Response } from 'express';

import { DataManager } from '../../class/DataManager';

const config = new DataManager().getConfig();

export const support = (req: Request, res: Response) => {
    res.redirect(config.support_invite);
};
