<template>
  <q-page padding>
    <q-page-container>
        <q-list bordered separator v-show="torrentList">
          <q-item v-for="torrent in torrentList" :key="torrent.ID">
            <q-item-section avatar>
              <q-btn flat class="full-height" @click="(torrent.Status == 'Downloading' || torrent.Status == 'Idle') ? pauseTorrent(torrent.ID) : resumeTorrent(torrent.ID)">
                <q-icon color="primary" :name="(torrent.Status == 'Downloading' || torrent.Status == 'Idle') ? 'pause_circle_filled' : 'play_circle_filled'" />
              </q-btn>
            </q-item-section>
            <q-item-section>
              <div class="row">{{ torrent.Name }}</div>
              <div class="row">
                {{ torrent.Status }}
                <q-linear-progress :value="doneProgress(torrent)" class="q-mt-md" />
              </div>
            </q-item-section>
            <q-item-section side>
              <q-btn class="full-height" flat @click="deleteTorrent(torrent.ID)">
                <q-icon color="red" name="delete"/>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
    </q-page-container>
  </q-page>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import { getTorrentList } from '../store/torrent/actions'
export default {
  // name: 'PageName',
  data() {
    return {
    }
  },
  computed: {
    ...mapState('torrent', ['torrentList']),
  },
  methods: {
    ...mapActions('torrent', ['getTorrentList', 'deleteTorrent', 'pauseTorrent', 'resumeTorrent']),
    doneProgress(torrent) {
      return parseFloat(torrent.Done.replace("%", ""))/100
    },
    startTimer(interval) {
      var vm = this
      setInterval(() => {
        this.getTorrentList()
      }, interval);
    }
  },
  mounted() {
    this.getTorrentList()
    this.startTimer(60000)
  }
}
</script>
