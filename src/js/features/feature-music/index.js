import musicReducer from './reducers/music.reducer'
import * as musicService from './services/music.service'
// import musicListener from './listeners/music.listener'

export const reducers = {
    musics: musicReducer,
}

export const services = [musicService]

export const listeners = [
    // musicListener,
]
