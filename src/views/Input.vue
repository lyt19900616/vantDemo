<template>
  <div>
    <van-nav-bar title="input" left-arrow @click-left="$router.go(-1)" placeholder fixed/>
    <div class="module_title">键盘</div>
<!-- 手机号   -->
    <van-field clearable v-model="tel" label="联系电话" type="tel" placeholder="请输入联系电话" :maxlength="11" :error = "telErr" @input="checkPhone" @focus="telErr = false" required></van-field>
<!-- 身份证号   -->
    <van-field readonly center v-model="perId" label="身份证号" placeholder="请输入身份证号" required :maxlength="18" :error=perIdErr @focus="perIdErr=false" @touchstart.native.stop="keyboardShow = true"></van-field>
    <!--身份证自定义键盘-->
    <van-number-keyboard
      safe-area-inset-bottom
      :maxlength="18"
      :show="keyboardShow"
      close-button-text="完成"
      extra-key="X"
      @blur="keyboardShow = false"
      @input="chekIdNum"
      @delete="onDelete()"
    />
<!-- 车牌号码   -->
    <!-- yt-error 是否将文字标红 boolean 默认值false-->
    <!-- yt-star 是否显示必填红点 Boolean 默认值false-->
    <!-- yt-title 左侧标题 String -->
    <!-- yt-placeholder 提示站位文字 Sting -->
    <car-num  v-model="carNum" ></car-num>
    <car-num :yt-error="carErr" v-model="carNum" yt-star yt-title="车牌号码" yt-placeholder="这是提示占位符"></car-num>
    <div class="module_title">格式验证</div>
    <van-field v-model="chinese" label="汉字" placeholder="只能输入汉字" clearable :formatter= "isCN"></van-field>
  </div>
</template>

<script>
import { isIdNumber, isPhoneNum } from '../utils/common'
import { Toast } from 'vant'
import CarNum from '../components/CarNum'
export default {
  name: 'Input',
  data () {
    return {
      tel: '', // 电话号码
      telErr: false,
      perId: '', // 身份证号码
      perIdErr: false,
      keyboardShow: false,
      carNum: '',
      carErr: false,
      chinese: ''

    }
  },
  components: {
    CarNum
  },
  created () {
  },
  methods: {
    checkPhone (v) {
      if (v.length === 11) {
        if (!isPhoneNum(v)) {
          this.telErr = true
          Toast('电话号码错误')
        }
      }
    },
    chekIdNum (v) {
      console.log(v)
      if (this.perId.length < 18) {
        this.perId += v
      }
      if (this.perId.length === 18) {
        if (!isIdNumber(this.perId)) {
          this.perIdErr = true
          Toast('身份证号码错误')
        }
        this.keyboardShow = false
      }
    },
    // 身份证删除
    onDelete () {
      this.perId = this.perId.substring(0, this.perId.length - 1)
    },
    // 汉字验证
    isCN (val) {
      return val.replace(/[^\u4E00-\u9FA5]/g, '')
    }
  }
}
</script>

<style scoped>
  .module_title {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
  }
</style>
