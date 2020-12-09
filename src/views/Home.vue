<template>
  <div class="home">
    <van-cell title="输入框" is-link @click="$router.push('/input')"/>
    <van-cell title="列表分页和删除" is-link @click="$router.push('/list')"/>
    <van-cell title="常用布局" is-link @click="$router.push('/layout')"/>
    <div class="test">dhjfka</div>
    <div class="one-ellipsis">hfdjakhfj kadshfjkdashfjkahsjkfdhjdskhgjkfhgjkfdhgjkshjgkhfjskdhgjkfsdhgjkshgjkshgjkfhsjgkhfjskhgfjk</div>
  </div>
</template>

<script>
// import { timestampToDateFormat } from '../utils/common.js'
// import { getUserInfo } from '../network/api'
export default {
  name: 'Home',
  data () {
    return {
      aa: ''
    }
  },
  created () {
    // // alert(timestampToDateFormat('MM-DD hh:mm:ss'))
    // getUserInfo(null).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
  }
}
</script>
<style scoped>
  .test {
    background-color: var(--themeColor);

  }
</style>
