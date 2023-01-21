import { Request, Response } from 'express';
import HenrikAPI from 'unofficial-valorant-api';

export const wins = async (req: Request, res: Response) => {
    const name = req.params.name;
    const tag = req.params.tag;
    const result = await Wins.getWins(name, tag);
    res.status(result.status);
    res.send(result.error === null ? result.data : result.error);
};

class Wins {
    static async getWins(name: string, tag: string): Promise<WinsResponse> {
        // @ts-expect-error
        const matches: MatchesData = await new HenrikAPI().getMatches({
            region: 'ap',
            name,
            tag,
            filter: 'competitive',
        });

        let winCount = 0;
        matches.data.forEach((value) => {
            let team: string;
            value.players.all_players.forEach((value) => {
                if (value.name === name) {
                    team = value.team;
                }
            });

            // @ts-expect-error
            if (value.teams[team.toLowerCase()].has_won) winCount++;
            return;
        });

        return {
            status: matches.status,
            data: `直近ランク5試合の勝率: ${winCount}W${5 - winCount}L`,
            error: matches.error,
        };
    }
}

interface WinsResponse {
    status: number;
    data: string | null;
    error: string | null;
}

interface MatchesData {
    status: number;
    data: MatchData[];
    ratelimits: {
        used: number;
        remaining: number;
        reset: number;
    };
    error: null;
    url: string;
}

interface MatchData {
    metadata: {
        map: string;
        game_version: string;
        game_length: number;
        game_start: number;
        game_start_patched: string;
        rounds_played: number;
        mode: string;
        queue: string;
        season_id: string;
        platform: string;
        matchid: string;
        region: string;
        cluster: string;
    };
    players: {
        all_players: PlayerData[];
        red: PlayerData[];
        blue: PlayerData[];
    };
    teams: {
        red: {
            has_won: boolean;
            rounds_won: number;
            rounds_lost: number;
        };
        blue: {
            has_won: boolean;
            rounds_won: number;
            rounds_lost: number;
        };
    };
    rounds: RoundData[];
    kills: KillData[];
}

interface PlayerData {
    puuid: string;
    name: string;
    tag: string;
    team: string;
    level: number;
    character: string;
    currenttier: number;
    currenttier_patched: string;
    player_card: string;
    player_title: string;
    party_id: string;
    session_playtime: {
        minutes: number;
        seconds: number;
        milliseconds: number;
    };
    behavior: {
        afk_rounds: number;
        friendly_fire: {
            incoming: number;
            outgoing: number;
        };
        rounds_in_spawn: number;
    };
    platform: {
        type: string;
        os: {
            name: string;
            version: string;
        };
    };
    ability_casts: {
        c_cast: number;
        q_cast: number;
        e_cast: number;
        x_cast: number;
    };
    assets: {
        card: {
            small: string;
            large: string;
            wide: string;
        };
        agent: {
            small: string;
            bust: string;
            full: string;
            killfeed: string;
        };
    };
    stats: {
        score: number;
        kills: number;
        deaths: number;
        assists: number;
        bodyshots: number;
        headshots: number;
        legshots: number;
    };
    economy: {
        spent: {
            overall: number;
            average: number;
        };
        loadout_value: {
            overall: number;
            average: number;
        };
    };
    damage_made: number;
    damage_received: number;
}

interface RoundData {
    /* 必要ないから定義しない */
}

interface KillData {
    /* 必要ないから定義しない */
}
