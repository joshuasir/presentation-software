// NOTE: never use eval here because it can cause security issues.

const { ipcRenderer, contextBridge } = require('electron')

// import boot function:

// contextBridge takes:
// expose name of feature
// feature methods

// you can initialize things inside init function during boot if needed:
// init();

// function init() {
//     // init stuff to be executed
// }

// Expose a bridging API to by setting an global on `window`.
// We'll add methods to it here first, and when the remote web app loads,
// it'll add some additional methods as well.
//
// !CAREFUL! do not expose any functionality or APIs that could compromise the
// user's computer. E.g. don't directly expose core Electron (even IPC) or node.js modules.

// notification example:
contextBridge.exposeInMainWorld('e_notification', {
    sendNotification(message) {
        ipcRenderer.invoke('notify', message)
    }
})

// Export the apis per feature here:
contextBridge.exposeInMainWorld('api_musics', {
    async getMusics() {
        const result = await ipcRenderer.invoke('get-musics')
        return result
    },
    async addMusic(args) {
        await ipcRenderer.invoke('add-music', args)
    },
    async updateMusicLyrics(args) {
        await ipcRenderer.invoke('update-lyrics', args)
    },
    async updateMusicTitle(args) {
        await ipcRenderer.invoke('update-title', args)
    },
    async deleteMusic(musicId) {
        await ipcRenderer.invoke('delete-music', musicId)
    }
})
