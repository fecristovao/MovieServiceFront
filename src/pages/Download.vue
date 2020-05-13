<template>
  <q-page padding>
    <div class="row text-center q-gutter-y-lg">
      <div class="col-12" padding v-for="download, i in downloadLinks" :key="i">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ download.Title }}</div>
          </q-card-section>
          <q-separator/>
          <q-card-actions>
            <q-btn label="Download" color="dark" class="full-width" @click="startDownload(i)" />
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
    ...mapState('movies', ['foundMovies']),
    getMovie() {
      return this.foundMovies[this.$route.params.serviceID].Movies[this.$route.params.itemID]
    },
    serviceName() {
      return this.foundMovies[this.$route.params.serviceID].Service
    }
  },
  methods: {
    startDownload(id) {
      var vm = this
      axios.post(process.env.API+"api/addMagnetLink", {Link: vm.downloadLinks[id].MagnetLink}).then(response => {
        vm.showNotif("Download Iniciado", "blue")
    }).catch(() => {
        vm.showNotif("Error ao iniciar download", "red")
    }).finally(() => {
        this.$q.loading.hide()
    })
    },
    showNotif(message, color) {
      this.$q.notify({
        message: message,
        color: color
      })
    }
  },
  mounted() {
    var vm = this
    this.$q.loading.show({
      delay: 400 // ms
    })
    axios.post(process.env.API+"api/getMagnetLinks", {Service: this.serviceName, Movie: this.getMovie}).then(response => {
        vm.downloadLinks = response.data
    }).finally(() => {
        this.$q.loading.hide()
    })
  }
}
</script>
