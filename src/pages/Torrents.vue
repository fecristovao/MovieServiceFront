<template>
  <q-page padding>
    <div class="container">
      <div class="row">
        <div class="col-1" v-for="column in columns">{{ column.label }}</div>
      </div>
      <div class="row gutter-lg" v-for="torrent in torrentList" :key="torrent">
        <div :class="(j == 8) ? 'col-3' : 'col-1'" v-for="key,i,j  in torrent" :key=key>{{ key }}</div>
        <div class='col-1'>
          <q-btn label="Delete" push class="full-width" @click="deleteTorrent(torrent.ID)"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import { getTorrentList } from '../store/torrent/actions'
export default {
  // name: 'PageName',
  data() {
    return {
       columns: [
        { name: 'id', align: 'center', label: 'ID', field: 'ID', sortable: true },
        { name: 'complete', label: 'Complete (%)', field: 'Done', sortable: true , align: 'center'},
        { name: 'downloaded', label: 'Downloaded', field: 'Downloaded' , align: 'center'},
        { name: 'ETA', label: 'ETA', field: 'ETA' , align: 'center'},
        { name: 'Up', label: 'Up', field: 'Up' , align: 'center', align: 'center'},
        { name: 'Down', label: 'Down', field: 'Down', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) , align: 'center'},
        { name: 'Ratio', label: 'Ratio (%)', field: 'Ratio', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) , align: 'center'},
        { name: 'Name', label: 'Status', field: 'Status' , align: 'center'},
        { name: 'Name', label: 'Name', field: 'Name' , align: 'center'},
      ],
    }
  },
  computed: {
    ...mapState('torrent', ['torrentList']),
  },
  methods: {
    ...mapActions('torrent', ['getTorrentList', 'deleteTorrent']),
  },
  mounted() {
    this.getTorrentList()
  }
}
</script>
