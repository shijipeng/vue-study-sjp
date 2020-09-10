<template>
    <div>
        <!-- label -->
        <label v-if="label">{{ label }}</label>
        <slot></slot>
        <!-- 错误信息 -->
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ['form'],
  props: ['label', 'prop'],
  data() {
    return {
      // error为什么是data？
      error: '',
      aaa: 222
    }
  },
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      // 获取校验规则
      const rules = this.form.rules[this.prop]
      // 获取当前值
      const value = this.form.model[this.prop]

      // 创建一个检验实例
      const schema = new Schema({ [this.prop]: rules })

      // 校验 ，返回Promise
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message
        } else {
          this.error = ''
        }
      })
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
