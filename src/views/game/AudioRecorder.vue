<template>
    <div>
      <van-button type="default" @click="recording">开始录音</van-button>
      <van-button type="default" @click="changeRideoSize">停止录音</van-button>
      <div>{{isStart ? '开始录音了' : ''}}</div>
      <van-button type="default" @click="playLuYin">播放录音</van-button>
      <div ref="aaa"></div>
    </div>
</template>

<script>
import { Toast } from 'vant'
import Recorder from 'js-audio-recorder'
let recorder = new Recorder()
export default {
  name: 'AudioRecorder',
  data () {
    return {
      isStart: false
    }
  },
  methods: {
    // 按下录音键
    recording () {
      let self = this
      Recorder.getPermission().then(() => {
        console.log('给权限了')
      }, error => {
        console.log(`${error.name} :${error.message}`)
      })
      recorder.onprogress = function (params) {
        self.rideoTimesNow = parseInt(params.duration)
        // console.log(params)
      }
      //  开始录音
      recorder.start().then(() => {
        console.log('录音中')
      }, error => {
        console.log(`${error.name} :${error.message}`)
      })
      this.isStart = true
    },
    // 结束录音
    changeRideoSize () {
      if (this.isStart) {
        if (this.rideoTimesNow < 1) {
          Toast('录音时间太短')
        }
        let wavData = recorder.getWAVBlob()
        console.log(wavData)
        let files = new window.File([wavData], 'yuyin', {type: 'audio/wav'})
        // debugger
        console.log(files)
        // this.$refs.aaa.innerHTML = `<audio controls>
        //                               <source src= ${files.webkitRelativePat} type="audio/wav">
        //                             </audio>`
        // this.playAudio(files)
      } else {
        recorder.stop()
      }
      this.isStart = false
    },
    playLuYin () {
      recorder.play()
    },
    playAudio (files) {
      let audio = new Audio()
      audio.src = files
      audio.play()
    }
  }
}
</script>

<style scoped>

</style>
