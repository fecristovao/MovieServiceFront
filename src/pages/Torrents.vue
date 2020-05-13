<template>
  <q-page padding>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure to delete <b>{{ confirmTorrent != null ? confirmTorrent.Name : "" }} </b>?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="primary" v-close-popup @click="promptConfirm()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div>
        <q-list bordered separator v-show="torrentList">
          <q-item class="row" v-for="torrent in torrentList" :key="torrent.ID">
            <q-item-section avatar>
              <q-btn flat class="full-height" @click="(torrent.Status == 'Downloading' || torrent.Status == 'Idle') ? pauseTorrent(torrent.ID) : resumeTorrent(torrent.ID)">
                <q-icon color="primary" :name="(torrent.Status == 'Downloading' || torrent.Status == 'Idle') ? 'pause_circle_filled' : 'play_circle_filled'" />
              </q-btn>
            </q-item-section>
            <q-item-section>
              <div class="row text-bold">{{ torrent.Name }}</div>
              <div class="row">{{ torrent.Status }} - {{torrent.Downloaded}}</div>
              <br />
              <div class="row">Down: {{torrent.Down}} kbp/s</div>
              <div class="row">Up: {{torrent.Up}} kbp/s</div>
              <div class="row">
                
                <q-linear-progress :value="doneProgress(torrent)" class="q-mt-md" />
                {{ torrent.Done }}
              </div>
            </q-item-section>
            <q-item-section side >
              <q-btn class="full-height full-width" flat @click="setConfirm(torrent)">
                <q-icon color="red" name="delete"/>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab  icon="keyboard_arrow_up" color="blue" direction="up" @click="scrollTop()"/>
      </q-page-sticky>
    </div>
    <br />
    <br />
    <br />
    <br />
  </q-page>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import { getTorrentList } from '../store/torrent/actions'
export default {
  // name: 'PageName',
  data() {
    return {
      confirm: false,
      confirmTorrent: null,
      timer: null
    }
  },
  computed: {
    ...mapState('torrent', ['torrentList']),
  },
  methods: {
    ...mapActions('torrent', ['getTorrentList', 'deleteTorrent', 'pauseTorrent', 'resumeTorrent', 'setIntervalRefresh']),
    ...mapMutations('torrent', ['destroyTimer']),
    doneProgress(torrent) {
      return parseFloat(torrent.Done.replace("%", ""))/100
    },
    startTimer(interval) {
      var vm = this
      this.timer = setInterval(() => {
        this.getTorrentList()
      }, interval);
    },
    setConfirm(torrent) {
      this.confirmTorrent = torrent
      this.confirm = true
    },
    promptConfirm() {
      this.deleteTorrent(this.confirmTorrent.ID)
      this.confirm = false
      this.confirmTorrent = null
    },
    scrollTop() {
      window.scrollTo(0, 0)
    }
  },
  mounted() {
    this.getTorrentList()
    this.setIntervalRefresh(2000)
    
  },
  beforeDestroy(){
    this.destroyTimer()
    console.log(this.timer)
  }
  
}
</script>
