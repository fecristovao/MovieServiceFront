/*
export function someMutation (state) {
}
*/

export const setTorrentList = (state, torrentList) => {
    state.torrentList = torrentList
}

export const createTimer = (state, timer) => {
    state.timerRefresh = timer
} 

export const destroyTimer = (state, timer) => {
    clearInterval(state.timerRefresh)
    state.timerRefresh = null
} 