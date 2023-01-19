import { DataManager } from './class/DataManager';
import { setupServer } from './utils/Express';

(async () => {
    const config = new DataManager().getConfig();
    const server = setupServer(config.isSecure);
})();
