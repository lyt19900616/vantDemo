<template>
  <div>
    <van-nav-bar title="常用布局" left-arrow @click-left="$router.go(-1)" placeholder fixed/>
<!--    顶部对齐-->
    <div class="box">
      <div class="left-box">左边的盒子固定宽度</div>
      <div class="mid-box">
        <div class="item-title one-ellipsis">内容的标题</div>
        <div class="item-content three-ellipsis">{{content}}</div>
      </div>
    </div>
<!--    左侧居中对齐，右侧底部对齐-->
    <div class="box">
      <div class="left-box mid-align">左边的盒子固定宽度</div>
      <div class="mid-box">
        <div class="item-title one-ellipsis">内容的标题</div>
        <div class="item-content three-ellipsis">{{content}}</div>
      </div>
      <div class="right-box bottom-align">右侧定宽盒子</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      content: '剩余的盒子随着剩余的宽度自动缩放，剩余最多显示3行内容，多于三行将以点点点的方式显示，标题只显示一行文字，超过一行显示省略'
    }
  }
}
</script>

<style scoped>
  .box {
    display: flex;
    box-sizing: border-box;
    padding: var(--globalMargin);
    background-color: #fff;
    margin-top: var(--cardMargin);
  }
  .left-box {
    flex: 0 0 6rem;
    margin-right: 8px;
  }
  .mid-align {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mid-box {
    flex: 1;
    margin-right: 8px;
  }
  .item-content {
    line-height: 1.5em;
    font-size: 14px;
    color: var(--blackContent);
  }
  .right-box {
    flex: 0 0 4rem;
  }
  .bottom-align {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
