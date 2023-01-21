"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.support = void 0;
const DataManager_1 = require("../../class/DataManager");
const config = new DataManager_1.DataManager().getConfig();
const support = (req, res) => {
    res.redirect(config.support_invite);
};
exports.support = support;
