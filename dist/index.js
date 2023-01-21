"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@suzuki3jp/utils");
const DataManager_1 = require("./class/DataManager");
const Router_1 = require("./Router/Router");
const Express_1 = require("./utils/Express");
(async () => {
    const config = new DataManager_1.DataManager().getConfig();
    const servers = (0, Express_1.setupServer)(config.isSecure);
    const logger = new utils_1.Logger({ isSaveLogToCsv: false });
    servers.server.listen(config.port, () => logger.system('API is ready at ', config.isSecure ? 'https' : 'http', '://localhost:', config.port.toString(), '.'));
    servers.app.use('/', Router_1.router);
})();
