const app = require(`express`)();
const path = require(`path`);
const dotenv = require(`dotenv`).config({ path: `.env` });
const { createServerHttp, createServerHttps } = require(`./util/server.js`);
const HTTP_PORT = 80;
const HTTPS_PORT = 443;

const { routeIndex, router } = require(`./routes/index.js`);

if (process.env.MODE === `http`) {
    const server = createServerHttp(app);
    server.listen(HTTP_PORT, () => {
        console.log(`listening now at ${process.env.BASE_URL}:${HTTP_PORT}`);
    });
    app.use(`/`, router);
}
