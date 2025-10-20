<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" class="login-left" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎登陆fleetpilot</h2>
          <el-form-item>
            <el-input placeholder="Please input" v-model="username" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="password" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default" color="" class="login_btn" @click="login_btn">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { identifyUser } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import useConfigStore, { type UserInfo } from '@/stores/modules/config'

const router = useRouter()
const username = ref('')
const password = ref('')
const storeInfo = useConfigStore()

// 发送用户名及密码
// 发送请求到服务端，获取access Token和refresh Token
// 获取到的token存放客户端相应位置
// 登陆跳转到/或/home路径
const login_btn = async () => {
  console.log("username:", username.value, "passwd:", password.value)
  try {
    const result = await identifyUser({
      username: username.value,
      password: password.value
    })
    if (result.code === 200) {
      ElMessage.success("登陆成功")
      console.log("accessToken:", result.data.accessToken)

      // accessTOken存储到本地
      localStorage.setItem('accessToken', result.data.accessToken)

      // 登陆用户信息写入pinia中
      storeInfo.setUser(result.data as UserInfo)

      console.log('pinia存入数据', result.data)
      // 跳转到home页面
      router.push('/home')
    }
  } catch (error) {
    ElMessage.error('登陆失败，请重试')
  }



}


</script>

<style lang="scss">
.login_container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background: url("/src/assets/bg.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;


  /* background-color: aquamarine; */
  .login_form {
    width: 50%;
    position: relative;
    top: 30vh;
    background-color: rgb(166, 202, 239);
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>