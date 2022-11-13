/**
 * @typedef {object} HenrikdevRes
 * @prop {number} status
 * @prop {HenrikdevResData} data
 */

/**
 * @typedef {object} HenrikdevResData
 * @prop {number} currenttier
 * @prop {string} currenttierpatched
 * @prop { { small: URL, large: URL, triangle_down: URL, triangle_up: URL } } images
 * @prop {number} ranking_in_tier
 * @prop {number} mmr_change_to_last_game
 * @prop {number} elo
 * @prop {string} name
 * @prop {string} tag
 * @prop {boolean} old
 */
module.exports = {};
