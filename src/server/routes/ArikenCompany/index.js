const path = require(`path`);
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.arikenCompanyHome = (req, res) => {
    res.sendFile(path.resolve(__dirname, `../../../client/html/ArikenCompany/home.html`));
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.arikenCompanyCommands = (req, res) => {
    res.sendFile(path.resolve(__dirname, `../../../client/html/ArikenCompany/commands.html`));
};
