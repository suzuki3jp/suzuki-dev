"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const Rank_1 = require("./routes/Rank");
const Uptime_1 = require("./routes/Uptime");
const Wins_1 = require("./routes/Wins");
const Support_1 = require("./routes/Support");
exports.router = (0, express_1.Router)()
    .get('/support', Support_1.support)
    .get('/rank/:name/:tag', Rank_1.rank)
    .get('/uptime/:id', Uptime_1.uptime)
    .get('/wins/:name/:tag', Wins_1.wins);
