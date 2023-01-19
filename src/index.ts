import { Logger } from '@suzuki3jp/utils';

import { DataManager } from './class/DataManager';
import { router } from './Router/Router';
import { setupServer } from './utils/Express';

(async () => {
    const config = new DataManager().getConfig();
    const servers = setupServer(config.isSecure);
    const logger = new Logger({ isSaveLogToCsv: false });
    servers.server.listen(config.port, () =>
        logger.system(
            'API is ready at ',
            config.isSecure ? 'https' : 'http',
            '://localhost:',
            config.port.toString(),
            '.'
        )
    );
    servers.app.use('/', router);
})();
