export const countFoundMovies = (state) => {
    return state.foundMovies.reduce((sum,b) => {return sum + b.Movies.length}, 0)
}

export const listServices = (state) => {
    return state.availableServices.map(service => {
        return {
          label: service,
          value: service
        }
    })
}