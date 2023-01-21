"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const Rank_1 = require("./routes/Rank");
const Uptime_1 = require("./routes/Uptime");
const Wins_1 = require("./routes/Wins");
exports.router = (0, express_1.Router)()
    .get('/api/rank/:name/:tag', Rank_1.rank)
    .get('/api/uptime/:id', Uptime_1.uptime)
    .get('/api/wins/:name/:tag', Wins_1.wins);
