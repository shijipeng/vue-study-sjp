<template>
  <div>
    <!-- 双向绑定 -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // 子组件不继承父组件的默认属性
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)

      // 触发校验
      // 事件的派发者和监听者是同一角色
      this.$parent.$emit('validate')
    }
  }

}
</script>

<style>

</style>
