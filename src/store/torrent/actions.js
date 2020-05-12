/*
export function someAction (context) {
}
*/

import axios from 'axios'
import {
    Loading,
    QSpinnerGears
  } from 'quasar'

export const getTorrentList = ({commit}) => {
    Loading.show()
    return axios.get("http://127.0.0.1:8888/api/listTorrents").then(response => {
        commit('setTorrentList', response.data)
    }).finally(() => {
        Loading.hide()
    })
}

export const deleteTorrent = ({commit, dispatch, state}, id) => {
    Loading.show()
    return axios.get("http://127.0.0.1:8888/api/deleteTorrent/"+ id).then(response => {
    }).finally(() => {
        Loading.hide()  
        dispatch('getTorrentList')
    })
}