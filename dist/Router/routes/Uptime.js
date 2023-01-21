"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uptime = void 0;
const utils_1 = require("@suzuki3jp/utils");
const uptime = async (req, res) => {
    const id = req.params.id;
    const result = await Uptime.getUptime(id);
    res.status(result.status);
    res.send(result.data);
};
exports.uptime = uptime;
class Uptime {
    static async getUptime(id) {
        let uptime = await new utils_1.RequestClient().get({
            url: `https://beta.decapi.me/twitch/uptime/${id}`,
        });
        uptime.data = uptime.data.toString();
        // 単位を日本語に置き換える
        // オフラインの場合
        if (uptime.data === `${id} is offline`)
            uptime.data = `${id}は現在オフラインです`;
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
