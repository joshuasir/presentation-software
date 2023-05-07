const sqlite = require('../../../services/sqlite')

// NOTE: IMPORTANT! always name the route method with method.
// Because it is used inside init function.

const method = async (musicId) => {
    const MusicModel = sqlite.getModel('Music')
    const result = await MusicModel.handleDeleteMusic(musicId)
    return result
}

module.exports = {
    method
}
