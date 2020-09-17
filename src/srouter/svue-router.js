// 1.main.js中 要use一下，vueRouter是一个插件 （a.声明两个全局组件）
// 2.声明一个路由表
// 3. 创建一个router实例，导出 ，挂载到vue根实例中
// 4.添加路由视图

/**
 * 需求分析
 * 1.spa页面不能刷新（hash #/about  || History api /about）
 * 2.根据url显示对应的内容 （router-view && 数据响应式：current 变量持有url地址，一旦变化，动态重新执行render）
 *
 *
 * 任务
 * 1.实现一个插件
 *    a.实现Vuerouter类（处理路由选项 ==>监控url变化，hashchange ==> 响应这个变化）
 *    b. 实现install 方法 ($router 注册 && 两个全局组件)
 *
 */

let _Vue

class VueRouter {
  // 选项：routes- 路由表
  constructor(options) {
    this.$options = options
    _Vue
    // 监控url变化
    window.addEventListener('hashchange', this.onhashchange.bind(this))
  }
  onhashchange() {
    // 此处的this取决于调用时的this，指向 vueRouter new出来的实例，即router
    this.current = window.location.hash.slice(1)
  }
}
VueRouter.install = function(Vue) {
  _Vue = Vue
  // 1. 挂载$router
  Vue.mixin({
    beforeCreate() {
      // this指的是当前组件实例，$opions指的是当前组件配置对象
      // 并不是所有组件都有options选项的
      // 只有根实例才有options
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }

  })
  // 2. 定义两个全局组件router-link, router-view
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        require: true
      }
    },
    render(h) {
      // <a href='/about'>vvv</a>
      return h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, this.$slots.default)
    }
  })
  Vue.component('router-view', {
    render(h) {
      let component = null
      // 找到当前Url对应的组件
      const route = this.$router.$options.route.find(route => route.path === this.$router.current)
      component = route.component
      //  渲染传入的组件
      return h(component)
    }
  })
}
export default VueRouter
