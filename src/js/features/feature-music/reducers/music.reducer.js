export const initialState = {
    list: [],
}

/**
 * Actions
 */

export const SET_LIST = 'setList@musics'

export const setList = (musics) => ({
    type: SET_LIST,
    payload: { musics },
})

/**
 * Handlers
 */

export const actionHandlers = {
    [SET_LIST]: (state, { payload }) => ({
        ...state,
        list: payload.musics,
    }),
}

export default (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}
