<template>
  <div id="app">
    <!-- 主体内容-->
    <router-view/>
    <!-- 底部tabbar   -->
    <van-tabbar v-model="selectedItem" @change="changeTabbarItem" v-if="$route.meta.showTab">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="music-o">相机</van-tabbar-item>
      <van-tabbar-item icon="exchange">Mock</van-tabbar-item>
      <van-tabbar-item icon="hot-o">游戏</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedItem: this.$store.selectedItem
    }
  },
  methods: {
    changeTabbarItem (e) {
      this.$store.commit('changeTabbarItem', e)
      switch (e) {
        case 0:
          this.$router.replace('/home')
          break
        case 1:
          this.$router.replace('/camera')
          break
        case 2:
          this.$router.replace('/mock')
          break
        case 3:
          this.$router.replace('/gameBox')
          break
        default:
          break
      }
    }
  }
}
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
