<template>
  <q-page padding class="">
    <div class="row">
      <div class="col-12">
        <q-input bottom-slots v-model="movieName" label="Nome do Filme" @keydown.enter="searchMovies(movieName)">
            <template v-slot:before>
              <q-icon name="movie" @click="searchMovies(movieName)" />
            </template>

            <template v-slot:append>
              <q-icon v-if="movieName !== ''" name="close" @click="movieName = ''" class="cursor-pointer" />
              <q-icon name="search" />
            </template>
          </q-input>
      </div>
        <div class="row q-gutter-lg">
          <div class="column">
            <q-option-group inline
              v-model="services"
              :options="listServices"
              color="red"
              type="toggle"
            />
          </div>
          <div class="column">
            <q-btn label="Selecionar Tudo" push class="full-width" @click="selectAll()"/>
          </div>
        </div>
    </div>
    
    <template v-for="item, j in foundMovies">
      <br />
      <q-separator spaced />
      <div class="row">
        <div class="col-12 text-center text-h6">Encontrado {{ item.Movies.length }} resultados em {{ item.Service }}
          {{(j == 0) ? " e " + countFoundMovies + " resultados no total." : ""}}
        </div>
      </div>
      <q-separator spaced />
      <br />
      <div class="row q-gutter-lg justify-center">
          <div class="col-xs-12 col-sm-3 text-center" v-for="movie, i in item.Movies" :key="movie.Link">
            <q-card>
              <img :src="movie.Cover" width="20rem">

              <q-card-section>
                <div class="text-h9">{{ movie.Title }}</div>
              </q-card-section>

              <q-separator spaced />
              <q-card-actions>
                <q-btn push color="dark" class="full-width" label="Download" :to="{ name: 'Download', params: { serviceID: j, itemID: i } }"/>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import { getServices } from '../store/movies/actions'
export default {
data () {
    return {
      movieName: "",
    }
  },
  computed: {
    services: {
      get () {
        console.log(this.$store.state.services)
        return this.$store.state.movies.services
      },
      set (value) {
        this.setServices(value)
      }
    },
    ...mapState('movies', ['foundMovies']),
    ...mapGetters('movies', ['countFoundMovies', 'listServices'])
  },
  methods: {
    ...mapMutations('movies', ['setServices', 'setMovies']),
    ...mapActions('movies', ['searchMovies', 'getServices', 'selectAll']),
  },
  async mounted() {
      await this.getServices()
  }
}
</script>
