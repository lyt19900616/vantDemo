<template>
  <div>
    <van-nav-bar title="列表数据" left-arrow @click-left="$router.go(-1)" placeholder fixed/>
    <van-empty image="static/img/empty-image.png" description="暂无数据" v-if="empty" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-else
    >
      <van-swipe-cell v-for="(item, index) in list" :key="item.id">
        <van-card
          :num="item.createTime"
          :desc="item.content"
          :title="item.title"
          class="goods-card"
          :thumb="item.imgUrl"
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="deleteItem(index)"/>
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import { getList } from '../network/api'
import { Toast } from 'vant'
export default {
  name: 'List',
  data () {
    return {
      empty: false,
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    }
  },
  created () {
  },
  methods: {
    // 加载数据列表
    onLoad () {
      let self = this
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      getList(params).then(res => {
        console.log(res)
        if (res.status === 200) {
          if (res.list && res.list.length > 0) {
            self.empty = false
            let temp = res.list
            self.list.push(...temp)
            self.pageIndex++
            self.loading = false
            if (self.list.length >= res.total) {
              this.finished = true
            }
          } else {
            self.empty = true
          }
        } else {
          Toast(res.message)
        }
      })
    },
    // 删除数据
    /**
     * 删除数据时 调用了删除的接口后 如果删除成功 在本地直接删除列表中的那条数据即可
     * */
    deleteItem (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style scoped>
  .goods-card {
    margin-top: 10px;
    background-color: #fff;
  }
  .delete-button {
    height: 100%;
  }
</style>
