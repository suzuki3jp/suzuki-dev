"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rank = void 0;
const unofficial_valorant_api_1 = __importDefault(require("unofficial-valorant-api"));
const rank = async (req, res) => {
    const name = req.params.name;
    const tag = req.params.tag;
    const rank = await Rank.getRank('ja', name, tag);
    res.status(rank.status);
    res.send(rank.data);
};
exports.rank = rank;
class Rank {
    static async _getMMR(name, tag) {
        const api = new unofficial_valorant_api_1.default();
        const result = await api.getMMR({ version: 'v1', region: 'ap', name, tag });
        return {
            status: result.status,
            // @ts-expect-error
            data: !result.data ? null : `${result.data.currenttierpatched} | ${result.data.ranking_in_tier}rr`,
        };
    }
    static async getRank(lang, name, tag) {
        const mmr = await this._getMMR(name, tag);
        if (lang === 'en')
            return mmr;
        return this._translateToJapanese(mmr);
    }
    static _translateToJapanese(mmr) {
        if (mmr.status === 200 && mmr.data) {
            const [tier, place, _, point] = mmr.data.replaceAll('rr', '').split(' ');
            return {
                status: mmr.status,
                data: `${RankMap[tier]} ${place} | ${point}pt`,
            };
        }
        else
            return mmr;
    }
}
const RankMap = {
    Iron: 'アイアン',
    Bronze: 'ブロンズ',
    Silver: 'シルバー',
    Gold: 'ゴールド',
    Platinum: 'プラチナ',
    Diamond: 'ダイアモンド',
    Ascendant: 'アセンダント',
    Immortal: 'イモータル',
    Radiant: 'レディアント',
};
