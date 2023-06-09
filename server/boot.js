const { runHookApp } = require('@forrestjs/hooks')
const { app } = require('electron')
const path = require("path");

// set SQLite DB path:
const dbPath = path.join(app.getPath('userData'), 'db.sqlite')

runHookApp({
    trace: true,
    services: [
        require('./services/env'),
        require('./services/ipc-router'),
        require('./services/sqlite'),
    ],
    features: [
        require('./features/feature-music/index'),
    ],
    settings: async ({ setConfig, getEnv }) => {
        setConfig('ipcMain.routes', [{
            // this array recieves the routes from features on boot
            routes: [],
        }])
        setConfig('sqlite.connections', [{
            connectionName: 'default',
            database: dbPath,
            // this array recieves the model from features on boot
            models: [],
        }])
    },
})
