# vue

Q: watch 和 computed 和 methods 区别是什么？

A: 
a.computed 和 methods 相比，最大区别是 computed 有缓存：如果 computed 属性依赖的属性没有变化，那么 computed 属性就不会重新计算。methods 则是看到一次计算一次。
b.watch 和 computed 相比，computed 是计算出一个属性（废话），而 watch 则可能是做别的事情（如上报数据） 

Q: v-show与v-if区别是什么

A: 
v-if 是动态添加，当值为false 时，是完全移除该元素，即dom 树中不存在该元素。 v-show 仅是隐藏/ 显示，值为false 时，该元素依旧存在于dom 树中。 若其原有样式设置了display: none 则会导致其无法正常显示。

Q: 列表遍历时key有什么用

A:
我的理解就是，使用key的话，等于给元素加了另一个唯一的标识，相当于增加了一个维度。这样，虚拟DOM在做diff的时候就能更快速的比较出哪里做了改变，用最短的路径，来改变元素的排列。
下面是答案：
key的特殊attribute主要用在Vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes。如果不使用key, Vue会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用key时，它会基于key的变化重新排列元素顺序，并且会移除key不存在的元素。
有相同父元素的子元素必须有独特的key。重复的key会造成渲染错误。

Q: Vue 有哪些生命周期钩子函数？分别有什么用？

A: 
创建-> 挂载-> 更新-> 销毁
 • beforeCreate在实例初始化之后，数据观测(data observer)和event/watcher事件配置之前被调用。
 • created在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测(data observer), property和方法的运算，watch/event事件回调。然而，挂载阶段还没开始，$el property目前尚不可用。
 • beforeMount在挂载开始之前被调用：相关的render函数首次被调用。
 • mounted实例被挂载后调用，这时el被新创建的vm.$el替换了。如果根实例挂载到了一个文档内的元素上，当mounted被调用时vm.Sel也在文档内。
 • beforeUpdate数据更新时调用，发生在虚拟DOM打补丁之前。这里适合在更新之前访问现有的DOM,比如手动移除已添加的事件监听器。
 • updated由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用该钩子。
 • beforeDestroy实例销毁之前调用。在这一步，实例仍然完全可用。
 • destroyed实例销毁后调用。该钩子被调用后，对应Vue实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
 ![-w600](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16187958864113.jpg)

Q: vue如何实现组件间通信

A: 
* 父子组件：使用 v-on 通过事件通信
* 爷孙组件：使用两次 v-on 通过爷爷爸爸通信，爸爸儿子通信实现爷孙通信
* 任意组件：使用 eventBus = new Vue() 来通信，eventBus.$on 和 eventBus.$emit 是主要API
* 任意组件：使用 Vuex 通信

Q: data为什么是函数？

A: 
组件要复用，每个组件使用的数据要隔离。用函数返回数据则保证每个组件使用的数据都是新的。

Q: Vue数据响应式怎么做到的？

A: 
Vue的响应式是通过Object.defineProperty对数据进行劫持，并结合观察者模式实现。
Vue利用Object.defineProperty创建一个observer来劫持监听所有的属性，把这些属性全部转为getter和setterₒ Vue中每
个组件实例都会对应一个watcher实例，它会在组件渲染的过程中把使用过的数据属性通过getter收集为依赖。之后当依赖项
的setter触发时，会通知watcher,从而使它关联的组件重新渲染。
Vue不能检测到对象属性的添加或删除，解决方法是手动调用Vue.set或者this.$set


Q: Vuex怎么用的?

A: Vuex是一个声为Vue.js应用程序开发的状态管理器
State ：全局数据
Getter：由State的变化派生的数据
Mutation：对State的直接修改
Action： Action提交的是mutation,而不是直接变更状态。可以包含任意异步操作。
Module：将整个状态管理划分更细的粒度。

Q: VueRouter你怎么用的？

A: 
Vue Router是Vue.js官方的路由管理器。用在单页应用里。
原理：
Hash模式，监听hash的change,决定渲染对应的模块
History模式，HTML5的API： pushState和replaceState,这两个API可以改变url的同时不会发送请求。这样就可以监听url
变化来实现更新页面部分内容的操作。
说出核心概念的名字和作用：History模式/导航守卫/路由懒加载
说出常用 API: router-link/router-view/this.$router.push/this.$router.replace/this.$route.params
this.$router.push(7user-admin')
this.$route.params