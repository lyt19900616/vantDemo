<template>
    <div>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="Mockjs安装" name="1">{{item1}}</van-collapse-item>
        <van-collapse-item title="Mockjs使用" name="2">{{item2}}</van-collapse-item>
        <van-collapse-item title="GET请求" name="3" >{{item3}}</van-collapse-item>
        <van-collapse-item title="POST请求" name="4" >
          <van-field v-model="userName" label="账号" required/>
          <van-field v-model="password" type="password" label="密码" required/>
          <div class="login-btn" @click="login">登录</div>
        </van-collapse-item>
      </van-collapse>
    </div>
</template>

<script>
import { login } from '../network/api'
export default {
  name: 'Mock',
  data () {
    return {
      activeNames: ['1'],
      item1: `npm install mockjs   官方地址：http://mockjs.com`,
      item2: '创建文件夹mock，在其下的index.js按照接口文档编写mock,在main.js中引入即可，等正式后端接口完成直接注释即可',
      item3: '请看首页->列表分页和删除，这是示例',
      userName: '',
      password: ''
    }
  },
  methods: {
    login () {
      let param = {
        userName: this.userName,
        password: this.password
      }
      login(param).then(res => {
        console.log(res)
        if (res.status === 200) {
          alert(JSON.stringify(res.result))
        }
      })
    }
  }
}
</script>

<style scoped>
.login-btn {
  padding: 10px;
  background-color: var(--themeColor);
  color: #fff;
  text-align: center;
}
</style>
