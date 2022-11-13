const http = require(`http`);
const https = require(`https`);
const fs = require(`fs`);

/**
 *
 * @param {import("express").Express} expressApp
 * @returns {import("http").Server}
 */
exports.createServerHttp = (expressApp) => {
    const server = http.createServer(expressApp);
    return server;
};

/**
 *
 * @param {import("express").Express} expressApp
 * @return {import("https").Server}
 */
exports.createServerHttps = (expressApp) => {
    const server = https.createServer(
        {
            key: fs.readFileSync(`/etc/letsencrypt/live/suzuki-dev.com-0001/privkey.pem`),
            cert: fs.readFileSync(`/etc/letsencrypt/live/suzuki-dev.com-0001/cert.pem`)
        },
        expressApp);
    return server;
};
