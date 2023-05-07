// TODO: it might be a good practice to keep feature methods defined in this file:
// import ipcRoutes from './ipc-routes'
import { setList } from '../reducers/music.reducer'


export const exportMusics = () => async () => {
    // TODO: Implement export as JSON functionality
    console.log('export musics')
}

export const getMusics = () => async (dispatch) => {
    const musics = await api_musics.getMusics()
    dispatch(setList(musics))
}

export const addMusic = (val) => async (dispatch) => {
    await api_musics.addMusic(val)
    dispatch(getMusics())
}

export const getMusic = (musicId) => async (dispatch, getState) => {
    const { musics } = getState()
    const music = musics.list.filter(music => music.music_id === musicId)
    return music
}

export const updateMusicLyrics = (musicId, newVal) => async (dispatch) => {
    await api_musics.updateMusicLyrics({ musicId, lyrics: newVal })
    dispatch(getMusics())
}
export const updateMusicTitle = (musicId, newVal) => async (dispatch) => {
    await api_musics.updateMusicTitle({ musicId, title: newVal })
    dispatch(getMusics())
}


export const deleteMusic = (musicId) => async (dispatch) => {
    await api_musics.deleteMusic(musicId)
    dispatch(getMusics())
}


