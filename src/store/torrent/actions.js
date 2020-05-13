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
    return axios.get(process.env.API+"api/listTorrents").then(response => {
        commit('setTorrentList', response.data)
    })
}

export const deleteTorrent = ({commit, dispatch, state}, id) => {
    Loading.show()
    return axios.get(process.env.API+"api/deleteTorrent/"+ id).then(response => {
    }).finally(() => {
        dispatch('getTorrentList')
        Loading.hide()
    })
}

export const pauseTorrent = ({commit, dispatch, state}, id) => {
    Loading.show()
    return axios.get(process.env.API+"api/pauseTorrent/"+ id).then(response => {
    }).finally(() => {
        
        dispatch('getTorrentList')
        Loading.hide()  
    })
}

export const resumeTorrent = ({commit, dispatch, state}, id) => {
    Loading.show()
    return axios.get(process.env.API+"api/resumeTorrent/"+ id).then(response => {
    }).finally(() => {
         
        dispatch('getTorrentList')
        Loading.hide() 
    })
}