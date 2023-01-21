import { RequestClient } from '@suzuki3jp/utils';
import { Request, Response } from 'express';

export const uptime = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await Uptime.getUptime(id);
    res.status(result.status);
    res.send(result.data);
};

class Uptime {
    static async getUptime(id: string): Promise<UptimeResponse> {
        let uptime = await new RequestClient().get({
            url: `https://beta.decapi.me/twitch/uptime/${id}`,
        });
        uptime.data = uptime.data.toString();

        // 単位を日本語に置き換える
        // オフラインの場合
        if (uptime.data === `${id} is offline`) uptime.data = `${id}は現在オフラインです`;
        // 時間
        uptime.data = uptime.data.replaceAll('hours', '時間');
        uptime.data = uptime.data.replaceAll('hour', '時間');

        // 分
        uptime.data = uptime.data.replaceAll('minutes', '分');
        uptime.data = uptime.data.replaceAll('minute', '分');

        // 秒
        uptime.data = uptime.data.replaceAll('seconds', '秒');
        uptime.data = uptime.data.replaceAll('second', '秒');
        return {
            status: uptime.status,
            data: uptime.data,
        };
    }
}

interface UptimeResponse {
    status: number;
    data: string;
}
