const { Axios } = require(`./Axios.js`);
class Rank extends Axios {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    constructor (req, res) {
        super();
        this.req = req;
        this.res = res;
        /** @type {string} */
        this.name = req.params.name;
        /** @type {string} */
        this.tag = req.params.tag;
    };

    createUrl () {
        this.henrikUrl = encodeURI(`https://api.henrikdev.xyz/valorant/v1/mmr/ap/${this.name}/${this.tag}`);
        this.kyroskohUrl = encodeURI(`https://api.kyroskoh.xyz/valorant/v1/mmr/ap/${this.name}/${this.tag}`);
    }

    /**
     * @returns {string}
     */
    async getRank () {
        /** @type {import("../data/Type.js").HenrikdevRes} */
        const henrikRes = await super.get(this.henrikUrl);
        if (henrikRes.status !== 200) {
            /** @type {string} */
            const kyroskohRes = await super.get(this.kyroskohUrl);
            if (!Object.keys(RankMap).some(rank => kyroskohRes.startsWith(rank))) return `APIError: 一時的に利用できない状態になっています`;
            const [type, place, HYPHEN, tierEng] = kyroskohRes.split(` `);
            const tier = tierEng.split(`R`);
            const result = `${RankMap[type]} ${place} | ${tier}pt`;
            return result;
        } else {
            const [type, place] = henrikRes.data.currenttierpatched.split(` `);
            const result = `${RankMap[type]} ${place} | ${henrikRes.data.ranking_in_tier}pt`;
            return result;
        }
    }
};

const RankMap = {
    Iron: `アイアン`,
    Bronze: `ブロンズ`,
    Silver: `シルバー`,
    Gold: `ゴールド`,
    Platinum: `プラチナ`,
    Diamond: `ダイヤモンド`,
    Ascendant: `アセンダント`,
    Immortal: `イモータル`,
    Radiant: `レディアント`
};

/**
 * @typedef {Object} GetRankResult
 * @prop {boolean} isSuccessed
 * @prop {undefined | string}
 */
module.exports = { Rank };
