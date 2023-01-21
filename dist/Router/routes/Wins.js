"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wins = void 0;
const unofficial_valorant_api_1 = __importDefault(require("unofficial-valorant-api"));
const wins = async (req, res) => {
    const name = req.params.name;
    const tag = req.params.tag;
    const result = await Wins.getWins(name, tag);
    res.status(result.status);
    res.send(result.error === null ? result.data : result.error);
};
exports.wins = wins;
class Wins {
    static async getWins(name, tag) {
        // @ts-expect-error
        const matches = await new unofficial_valorant_api_1.default().getMatches({
            region: 'ap',
            name,
            tag,
            filter: 'competitive',
        });
        let winCount = 0;
        matches.data.forEach((value) => {
            let team;
            value.players.all_players.forEach((value) => {
                if (value.name === name) {
                    team = value.team;
                }
            });
            // @ts-expect-error
            if (value.teams[team.toLowerCase()].has_won)
                winCount++;
            return;
        });
        return {
            status: matches.status,
            data: `直近ランク5試合の勝率: ${winCount}W${5 - winCount}L`,
            error: matches.error,
        };
    }
}
