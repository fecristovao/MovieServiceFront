<template>
  <q-page padding>
    <div class="row text-center q-gutter-y-lg">
      <div class="col-12" padding v-for="download in downloadLinks" :key="movie">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ download.Qualidade }}</div>
          </q-card-section>
          <q-separator/>
          <q-card-actions>
            <q-btn label="Download" color="dark" class="full-width" push />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      downloadLinks: []
    }
  },
  computed: {
    ...mapState('movies', ['foundMovies'])
  },
  methods: {
    getMovieByID(serviceID, itemID) {
      return this.foundMovies[serviceID].Movies[i]
    }
  },
  mounted() {
    var movie = this.getMovieByID(this.$route.params.id)
    var vm = this
    this.$q.loading.show({
  delay: 400 // ms
})
    axios.post("http://192.168.0.9:8090/megatorrents/download/", {link: movie.Link}).then(response => {
        vm.downloadLinks = response.data
    }).finally(() => {
        this.$q.loading.hide()
    })
  }
}
</script>
