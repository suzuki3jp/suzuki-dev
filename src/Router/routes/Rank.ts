import { Request, Response } from 'express';
import HenrikAPI from 'unofficial-valorant-api';

import { Languages } from '../Router';

export const rank = async (req: Request, res: Response) => {
    const name = req.params.name;
    const tag = req.params.tag;
    const rank = await Rank.getRank('ja', name, tag);
    res.status(rank.status);
    res.send(rank.data);
};

class Rank {
    static async _getMMR(name: string, tag: string): Promise<RankResponse> {
        const api = new HenrikAPI();
        const result = await api.getMMR({ version: 'v1', region: 'ap', name, tag });
        return {
            status: result.status,
            // @ts-expect-error
            data: !result.data ? null : `${result.data.currenttierpatched} | ${result.data.ranking_in_tier}rr`,
        };
    }

    static async getRank(lang: Languages, name: string, tag: string): Promise<RankResponse> {
        const mmr = await this._getMMR(name, tag);
        if (lang === 'en') return mmr;
        return this._translateToJapanese(mmr);
    }

    static _translateToJapanese(mmr: RankResponse): RankResponse {
        if (mmr.status === 200 && mmr.data) {
            const [tier, place, _, point] = mmr.data.replaceAll('rr', '').split(' ');
            return {
                status: mmr.status,
                data: `${RankMap[tier]} ${place} | ${point}pt`,
            };
        } else return mmr;
    }
}

interface RankResponse {
    status: number;
    data: string | null;
}

const RankMap: Record<string, string> = {
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
