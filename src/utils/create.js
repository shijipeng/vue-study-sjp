import Vue from 'vue'

// Component - 组件配置对象
// props - 传递给它的属性
function create(Component, props) {
  // 1.构建实例
  const vm = new Vue({
    render(h) {
      // h 是 createElelmnet 函数
      // 可以返回一个vnode
      return h(Component, {props})
    }
  }).$mount() // 不设置挂在目标，依然可以转换vnode 为真实节点$el
  // 2.挂载到vue上
  document.body.appendChild(vm.$el)

  // 3. 获取组件实例
  const comp = vm.$children[0]
  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return comp
}
export default create
