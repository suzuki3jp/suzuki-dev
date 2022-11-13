const { Router } = require(`express`);
const { arikenCompanyHome } = require(`./ArikenCompany/index.js`);
const { arikenRank, arikenUptime, arikenWins, rank, wins } = require(`./api/index.js`);
const router = Router();

/**
 * @param {import("express").Express} expressApp
 */
router
    .get(`/arikencompany`, arikenCompanyHome)
    .get(`/arikencompany/commands`, arikenCompanyHome)
    .get(`/api/rank/:name/:tag`, rank)
    .get(`/api/wins/:name/:tag`, wins);

module.exports = { router };
