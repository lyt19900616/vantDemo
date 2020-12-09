<template>
  <div>
<!--    使用蓝信的js实现调起手机摄像头和选择文件夹的方法-->
    <div class="camera_box">
      <div class="item_title">上传附件</div>
      <div class="item_box" v-for="(item,index) in imgs" :key="index">
        <img :src="item" alt="" >
        <div class="item_del" @click="delImg(index)">
          <van-icon class="err_img" name="cross" size="12" color="#fff"/>
        </div>
      </div>
      <div class="camera" @click="takePhone" v-if="imgs.length < 3">
        <img src="static/img/camera.png" alt="">
      </div>
    </div>
<!--    使用vant调起摄像头， 在蓝信上无法调起摄像头-->
    <van-field name="uploader" label="附件上传">
      <template #input>
        <van-uploader
          v-model="uploader"
          capture='camera'
          multiple
          :max-count="3"
          preview-size = "60px"
          @delete="deleteImg"
          :before-read="beforeRead"
          :after-read="afterRead"
        />
      </template>
    </van-field>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import {img64Compress} from '../utils/common'
export default {
  name: 'Camera.vue',
  data () {
    return {
      imgs: ['static/img/camera.png'],
      fileList: [],
      uploader: [],
      imgList: []
    }
  },
  methods: {
    showBigImg () {
      ImagePreview(['static/img/camera.png'])
    },
    delImg (index) {
      this.imgs.splice(index, 1)
    },
    takePhone () {
      var that = this
      var args = {
        maxCount: 1,
        onlyCamera: false,
        compressType: 'Sixteenth',
        accept: 'image/*'
      }
      // eslint-disable-next-line no-undef
      BluePrint.RuntimeService.NativeService.chooseImage(args).then((result) => {
        if (result.nativeFiles != null && result.nativeFiles.length > 0) {
          const url = result.nativeFiles[0].url
          // alert(JSON.stringify(url))
          convertImgToBase64(url, function (base64Code) {
            // that.uploadImg_idCard(base64Code)
            alert(base64Code)
            that.imgs.push(base64Code)
            that.img1 = base64Code
          })
        }
      })
      async function convertImgToBase64 (url, callback) {
        var img = new Image()
        img.crossOrigin = 'Anonymous'
        img.onload = function () {
          var canvas = document.createElement('CANVAS')
          var ctx = canvas.getContext('2d')
          if (Math.max(this.height, this.width) > 200) {
            if (this.height > this.width) {
              canvas.width = 200
              canvas.height = this.height * 200 / this.width
            }
          } else {
            canvas.height = this.height
            canvas.width = this.width
          }
          ctx.drawImage(this, 0, 0)
          // var dataURL = canvas.toDataURL('image/jpeg')
          // dataURL = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
          callback(canvas.toDataURL('image/jpeg'))
          canvas = null
        }
        img.src = url
      }
    },
    // 照片处理
    beforeRead (file) {
      // console.log(file)
      // alert(file.size / 1024)
      if (file.type.indexOf('image') === -1) {
        return false
      } else {
        return true
      }
    },
    afterRead (file) {
      // console.log(file)
      let self = this
      img64Compress(file.content, 320, 1).then(res => {
        // alert(res.length / 1024)
        self.imgList.push(res)
      })
    },
    deleteImg (file, obj) {
      this.imgList.splice(obj.index, 1)
    }
  }
}
</script>

<style scoped>
  .camera_box {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    background-color: #fff;
  }
  .item_title {
    flex: 0 0 100px;
    text-align: center;
  }
  .item_box, .camera{
    background-color: #f7f8fa;
    width: 80px;
    height: 80px;
    margin-left: 5px;
  }
  .item_box {
    position: relative;
  }
  .item_del {
    position: absolute;
    top: 0;
    right: 0;
    width: 14px;
    height: 14px;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 0 0 0 12px;
  }
  .item_del .err_img {
    position: absolute;
    top: 0;
    right: 0;
  }
  .item_box img {
    height: 100%;
    width: 100%;
  }
  .camera {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .camera img {
    width: 32px;
    height: 32px;
  }
</style>
