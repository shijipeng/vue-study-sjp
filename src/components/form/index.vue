<template>
    <div>
        <!-- form 层级为什么还要绑定model -->
        <Sform :model="model" :rules="rules" ref="Sform">
            <SformItem label="用户名" prop="username">
                <Sinput v-model="model.username" placeholder="用户名"></Sinput>
            </SformItem>
            <SformItem label="密码" prop="password">
                <Sinput v-model="model.password" placeholder="密码" type="password"></Sinput>
            </SformItem>
            <SformItem>
                <button @click="login">登录</button>
            </SformItem>
        </Sform>

        <!-- 监听子组件的事件 绑定的函数 不能带（），否则子组件无法给父组件传参 ，若不传参 可带可不带-->
        <!-- <Sinput :value="model.username" @input="inputMethod()" placeholder="你说吊不吊"></Sinput>
        {{model.username}} -->

        <!-- 普通的事件监听绑定的函数 后面带括号和不带括号没有区别，只是带括号的可以传参 -->
        <!-- <div @click="count(1)">点我（）</div>
        <div @click="count">点我</div>
        {{num}} -->
    </div>
</template>

<script>
import Sinput from '@/components/form/Sinput.vue'
import SformItem from '@/components/form/SformItem.vue'
import Sform from '@/components/form/Sform'

import Notice from '@/components/Notice.vue'
import create from '@/utils/create'
export default {
  components: {
    Sinput,
    SformItem,
    Sform
  },
  data() {
    return {
      num: 1,
      model: {
        username: 'tom1',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '必须输入用户名' }],
        password: [{ required: true, message: '必须输入密码' }]
      }
    }
  },
  created() {
    console.log(this.$root, this)
  },
  methods: {
    count() {
      this.num++
    },
    inputMethod(val) {
      this.model.username = val
    },
    login() {
      this.$refs.Sform.validate(isValid => {
        create(Notice, {
          title: '老杨喊你来搬砖',
          message: isValid ? '请求登陆' : '校验失败'
        }).show()
        // if (isValid) {
        //   console.log('提交登录')
        // } else {
        //   alert('登录失败')
        // }
      })
    }
  }
}
</script>

<style scoped>
</style>
