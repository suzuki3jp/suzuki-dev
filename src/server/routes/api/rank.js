const { Rank } = require(`./class/Rank.js`);
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.rank = async (req, res) => {
    const client = new Rank(req, res);
    client.createUrl();
    const result = await client.getRank();
    console.log(result);
    res.send(result);
};
