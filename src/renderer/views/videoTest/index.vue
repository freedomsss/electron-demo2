<template>
  <div class="app-container">
    <div class="test_two_box">
      <VideoDemo
        src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        src-type="video/mp4"
        videoId="video_mp4"
      />
    </div>
    <div>
      <div>num: {{num}} + 6</div>
      <div>result: {{result}}</div>
      <el-button type="primary" @click="add">点击加</el-button>
    </div>
    <div>
      <el-button type="primary" @click="setVideo">打开摄像头</el-button>
      <video src="" id="VideoBlock"></video>
    </div>
  </div>
</template>

<script>
import edgeModules from '../../../main/edgeModules/index.js'
import VideoDemo from '../../components/VideoBlock/VideoEle'

export default {
  name: 'videoTest',
  data() {
    return {
      list: [],
      num: 4,
      result: 0
    }
  },
  components: {
    VideoDemo
  },
  mounted() {
    console.log('通过dll获取到的值：')
    edgeModules.helloWorld('JavaScript', (error, result) => {
      if (error) throw error
      console.log(result)
    })
  },
  methods: {
    setVideo() {
      const that = this
      navigator.mediaDevices
        .enumerateDevices()
        .then(devices => {
          console.log('devices', devices)
          that.list = devices
          // var camera = devices.find(device => device.label === 'HD USB Camera (05a3:9230)')
          var camera = devices.find(device => device.label === 'Kinect V2 Video Sensor (045e:02c4)')
          // var camera = devices.find(device => device.deviceId === '61a87f7e7ff5119c983f17041be72b6bd2f9a3a349048100422fbe691f93c7fb')
          // var camera = devices.find(device => device.deviceId === '6f4e62a6546b59e95651d08903627b8b456c72675935898fd2b6764ad67d0471')
          if (camera) {
            var constraints = {
              video: { deviceId: { exact: camera.deviceId }},
              audio: false
            }
            return navigator.mediaDevices.getUserMedia(constraints)
          }
        })
        .then(stream => {
          var video = document.getElementById('VideoBlock')
          video.srcObject = stream
          video.autoplay = true
          var content = document.getElementsByClassName('videoBox')
          console.log('content', content)
          // VideoBlock.height = content.offsetHeight
          // video.width = '800px'
        })
        .catch(e => console.log(e))
    },
    add() {
      const that = this
      edgeModules.add(Number(this.num++), (error, result) => {
        if (error) throw error
        that.result = result
      })
    }
  }
}
</script>

<style scoped>

</style>