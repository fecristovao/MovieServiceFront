import axios from 'axios'
import {
    Loading,
  
    // optional!, for example below
    // with custom spinner
    QSpinnerGears
  } from 'quasar'

export const searchMovies = ({commit, state}, term) => {
    Loading.show()
    return axios.post("http://127.0.0.1:8888/api/searchMovie", {Services: state.services, movieName: term}).then(response => {
        commit('setMovies', response.data)
    }).finally(() => {
        Loading.hide()
    })
}

export const getServices = ({commit, dispatch, state}) => {
    Loading.show()
    return axios.get("http://127.0.0.1:8888/api/listservices").then(response => {
        commit('setAvailableServices', response.data)
    }).finally(() => {
        Loading.hide()
        dispatch('selectAll')
    })
}

export const selectAll = ({commit, state}) => {
    var services = state.availableServices
    return commit('setServices', services)
}