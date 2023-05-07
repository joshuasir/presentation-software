/*
    EXPORT FEATURE IPC ROUTES HERE
*/

module.exports = {

    /*
        SETUP FEATURE IPC ENDPOINTS
    */

    routes: [
        {
            name: 'add-music',
            handler: require('./routes/add-music'),
        },
        {
            name: 'get-music',
            handler: require('./routes/get-music'),
        },
        {
            name: 'update-title',
            handler: require('./routes/update-title'),
        },
        {
            name: 'update-lyrics',
            handler: require('./routes/update-lyrics'),
        },
        {
            name: 'delete-music',
            handler: require('./routes/delete-music'),
        },
        {
            name: 'get-musics',
            handler: require('./routes/get-musics'),
        },
        
    ]
}
