# vue

## Vue2的生命周期钩子有哪些？数据请求放在哪个钩子？

### 答题思路

这是一个关于Vue.js框架基础知识的问题，主要是对Vue的生命周期钩子函数的理解。在回答这个问题时，你需要详细列出Vue的生命周期钩子函数，并且解释每个钩子函数的用途。对于数据请求放在哪个钩子函数的问题，你需要根据经验和对Vue生命周期的理解来回答。

### 答题关键点

1. **Vue生命周期钩子**：Vue实例从创建到销毁的过程中，会经历一系列的生命周期阶段，每个阶段都有对应的生命周期钩子函数。
2. **数据请求放置的钩子**：通常，我们会将数据请求放在 `created` 或 `mounted` 钩子函数中。

### 答案示例

Vue的生命周期钩子函数主要有以下几个：

- **beforeCreate**：实例刚在内存中被创建出来，此时还未初始化data属性。
- **created**：实例已经完成了以下的配置：数据观测(data observer)，属性和方法的运算，watch/event事件回调。然而，挂载阶段还没开始，$el属性目前不可见。
- **beforeMount**：在挂载开始之前被调用：相关的render函数首次被调用。
- **mounted**：实例已经挂载到DOM中，此时你可以通过DOM API获取到DOM节点，$el属性现在已经可见。
- **beforeUpdate**：数据更新时调用，发生在虚拟DOM重新渲染和打补丁之前。可以在此钩子中进一步改变状态，不会触发附加的重渲染过程。
- **updated**：实例更新完毕时调用。此时DOM已经完成更新。要注意该钩子在初次渲染时并不会被调用。
- **beforeDestroy**：实例销毁之前调用。实例仍然完全可用。
- **destroyed**：实例销毁后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。

对于数据请求，通常我们会放在 `created` 或 `mounted` 钩子函数中。`created` 钩子函数在服务端渲染中是唯一被调用的钩子函数，如果你需要在渲染前就获取数据的话，这是一个很好的选择。而 `mounted` 钩子函数在DOM已经挂载完毕，可以直接操作DOM时调用，如果你的数据请求会影响到DOM，那么可以选择在 `mounted` 钩子函数中进行。

### 关键点脑图

```markdown
- Vue生命周期钩子函数
  - beforeCreate
  - created
  - beforeMount
  - mounted
  - beforeUpdate
  - updated
  - beforeDestroy
  - destroyed
- 数据请求放置的钩子
  - created
  - mounted

```
## VUE2组件通信方式有哪些？

### 答题思路

这是一个关于Vue.js框架中组件通信的问题，主要是理解Vue中各种组件通信方式。在回答这个问题时，你需要详细列出Vue中常用的组件通信方式，并简单解释每种方式的用途和工作原理。

### 答题关键点

1. **父子组件通信**：父组件向子组件传递数据可以使用props，子组件向父组件发送消息可以使用自定义事件。
2. **非父子组件通信**：非父子组件通信可以使用事件总线（Event Bus）或者Vuex。

### 答案示例

Vue中的组件通信方式主要有以下几种：

1. **Props/Events**：这是父子组件之间通信的基本方式。父组件通过props向下传递数据给子组件，子组件通过events给父组件发送消息。
2. **$emit/$on**：Vue实例提供了一个事件触发机制：父组件可以通过$on监听事件，子组件通过$emit触发事件。
3. **Event Bus**：创建一个新的Vue实例作为事件总线，用它来触发事件和监听事件。
4. **Vuex**：Vuex是一个专为Vue.js应用程序开发的状态管理模式，它采用集中式存储管理应用的所有组件的状态。
5. **$parent/$children 和 refs**：父组件可以通过$children属性访问子组件，子组件可以通过$parent访问父组件。
6. **provide/inject**：祖先组件有一个方法provide来提供变量，然后其后代组件有一个方法inject来接收provide提供的变量。

### 关键点脑图

```markdown
- Vue组件通信方式
  - Props/Events
    - 父组件通过props向子组件传递数据
    - 子组件通过$emit触发事件，父组件通过$on监听事件
  - Event Bus
    - 创建一个新的Vue实例作为事件总线
  - Vuex
    - 一个专为Vue.js应用程序开发的状态管理模式
  - $parent/$children 和 refs
    - 通过这些属性和refs来直接访问组件实例
  - provide/inject
    - 祖先组件通过provide提供变量，后代组件通过inject接收变量

```
## Vuex用过吗？怎么理解？

### 答题思路

这是一个关于Vue.js中状态管理库Vuex的问题，主要是对Vuex的理解。在回答这个问题时，你需要详细地解释Vuex的基本概念，包括它的工作原理和主要功能。

### 答题关键点

1. **Vuex**：Vuex是一个专为Vue.js应用程序开发的状态管理模式和库，集中式存储管理应用的所有组件状态。
2. **核心概念**：Vuex的核心概念包括state、getter、mutation、action和module。

### 答案示例

Vuex是一个专为Vue.js应用程序开发的状态管理模式和库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

Vuex的核心概念包括：

- **State**：Vuex使用单一状态树，用一个对象就包含了全部的应用层级状态。作为一个“唯一数据源 (SSOT)”存在。
- **Getters**：Vuex允许在store中定义"getters"（可以认为是store的计算属性）。就像计算属性一样，getters的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
- **Mutations**：更改Vuex的store中的状态的唯一方法是提交mutation。Vuex中的mutations非常类似于事件：每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler)。
- **Actions**：Action类似于mutation，不同在于，Action提交的是mutation，而不是直接变更状态，而且Action可以包含任意异步操作。
- **Modules**：随着应用复杂度的增加，store对象就可能变得相当臃肿。为了解决以上问题，Vuex允许我们将store分割成模块（module）。每个模块拥有自己的state、mutation、action、getter、甚至是嵌套子模块。

### 关键点脑图

```markdown
- Vuex
  - State
    - 单一状态树，作为一个“唯一数据源 (SSOT)”存在
  - Getters
    - store中的计算属性，返回值会根据依赖被缓存，只有依赖值改变才会重新计算
  - Mutations
    - 更改state的方法，每个mutation都有一个字符串的事件类型和一个回调函数
  - Actions
    - 提交mutation，可以包含任意异步操作
  - Modules
    - 允许我们将store分割成模块，每个模块拥有自己的state、mutation、action、getter、甚至是嵌套子模块

```
## VueRouter用过吗？怎么理解？

### 答题思路

这是一个关于Vue.js中的路由库Vue Router的问题，主要是对Vue Router的理解。在回答这个问题时，你需要详细地解释Vue Router的基本概念，包括它的工作原理和主要功能。

### 答题关键点

1. **Vue Router**：Vue Router是Vue.js官方的路由管理器，它和Vue.js的核心深度集成，使得构建单页面应用变得易如反掌。
2. **核心概念**：Vue Router的核心概念包括路由、路由匹配、路由视图、路由导航等。

### 答案示例

Vue Router是Vue.js官方的路由管理器，它和Vue.js的核心深度集成，使得构建单页面应用(SPA)变得易如反掌。

Vue Router的核心概念包括：

- **路由配置**：在Vue Router中，我们通过编写路由配置来定义哪个URL渲染哪个组件。
- **路由匹配**：当一个路由被触发时，它会根据URL匹配到一个或多个定义的路由配置，并根据配置决定渲染哪个组件。
- **路由视图**：渲染的组件会显示在`<router-view>`位置，我们可以在应用中的任何地方使用`<router-view>`标签，渲染对应的组件。
- **路由导航**：我们可以使用`<router-link>`来导航到一个路由，也可以使用编程式的导航来完成。
- **导航守卫**：Vue Router提供了导航守卫来保护路由的导航，我们可以在全局、单个路由配置或者组件内部设置导航守卫。

### 关键点脑图

```markdown
- Vue Router
  - 路由配置
    - 定义哪个URL渲染哪个组件
  - 路由匹配
    - 根据URL匹配到一个或多个定义的路由配置
  - 路由视图
    - 渲染的组件会显示在`<router-view>`位置
  - 路由导航
    - 使用`<router-link>`或者编程式的导航来导航到一个路由
  - 导航守卫
    - 保护路由的导航，可以在全局、单个路由配置或者组件内部设置

```
## Vue2是如何实现双向绑定的？

### 答题思路

这是一个关于Vue.js框架中双向数据绑定原理的问题，主要是对Vue双向数据绑定的理解。在回答这个问题时，你需要详细地解释Vue如何实现数据的双向绑定，包括数据劫持和发布订阅模式。

### 答题关键点

1. **数据劫持**：Vue.js通过Object.defineProperty()方法劫持数据的getter和setter，从而实现数据的响应式。
2. **发布订阅模式**：当数据变化时，触发setter，通知所有订阅该数据的订阅者，执行更新操作。

### 答案示例

Vue.js是通过数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体步骤如下：

1. **数据劫持**：Vue.js使用Object.defineProperty()方法，该方法可以用来劫持对象的属性的getter和setter操作。在getter操作中，可以进行依赖收集，在setter操作中，可以触发依赖更新。
2. **实例化订阅者Watcher**：在解析模板过程中，遇到指令绑定或插值表达式，就会创建对应的Watcher实例，订阅数据变化。
3. **绑定更新函数**：Watcher会将自己添加到对应的Dep实例中，Dep实例内部维护了一组Watcher实例，当数据发生变化时，Dep会通知所有的Watcher实例，执行对应的更新操作。
4. **数据变动，更新视图**：当通过Vue实例修改数据时，会触发setter，setter会通知Dep，Dep再通知所有订阅者Watcher，Watcher再根据新的数据值，更新视图。

这就是Vue.js实现双向数据绑定的基本流程。

### 关键点脑图

```markdown
- Vue双向绑定原理
  - 数据劫持
    - 通过Object.defineProperty()劫持数据的getter和setter
  - 实例化订阅者Watcher
    - 解析模板，创建对应的Watcher实例，订阅数据变化
  - 绑定更新函数
    - Watcher添加到对应的Dep实例中，Dep通知所有Watcher实例执行更新操作
  - 数据变动，更新视图
    - 修改数据触发setter，通知Dep，Dep通知所有Watcher，Watcher更新视图

```
## Vue3为什么使用Proxy？

### 答题思路

这是一个关于Vue.js 3版本中使用Proxy的原因的问题，主要是对Proxy的理解和它在Vue.js 3中的应用。在回答这个问题时，你需要详细地解释Proxy的基本概念，以及它在Vue.js 3中的优点。

### 答题关键点

1. **Proxy**：Proxy 是 ES6 提供的新特性，用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
2. **Vue 3中使用Proxy的原因**：Vue 3使用Proxy来实现数据响应系统，这样做有许多优点，比如支持全部的数据类型、性能更好、代码量更少等。

### 答案示例

Proxy是ES6提供的新特性，它可以用来定义在访问某些对象时的行为。Vue 3使用Proxy来实现数据的响应式，这样做有以下的优点：

1. **支持全部的数据类型**：不像Vue 2只能劫持对象类型，通过Object.defineProperty只能劫持对象的属性，因此需要对每个对象、数组遍历进行代理。Proxy可以直接代理对象而不需要对每个属性进行代理，可以支持数组和对象。
2. **性能更好**：Proxy直接代理对象，不需要像Vue 2那样遍历每个属性。Vue 2中每个属性都需要被转化为getter和setter，这在有大量属性的情况下会导致性能下降。
3. **代码量更少**：由于Proxy可以直接代理对象，因此Vue 3中的响应式系统的代码量比Vue 2少了很多。

以上，Proxy的灵活性和能力使得Vue 3的响应式系统更加强大和高效。

### 关键点脑图

```markdown
- Vue 3使用Proxy的原因
  - 支持全部的数据类型
    - Proxy可以直接代理对象，支持数组和对象
  - 性能更好
    - Proxy直接代理对象，不需要遍历每个属性
  - 代码量更少
    - Proxy可以直接代理对象，代码量比Vue 2少很多

```
## Vue3比Vue2做了哪些改动？

### 答题思路

这是一个关于Vue.js 3版本与Vue.js 2版本对比的问题，主要是理解Vue.js 3的新特性和改动。在回答这个问题时，你需要详细地列出Vue.js 3相比Vue.js 2的主要改动，并简单解释每个改动的作用和意义。

### 答题关键点

1. **性能改进**：Vue.js 3在性能上做了大量的优化，包括更小的体积、更快的渲染速度等。
2. **新特性**：Vue.js 3引入了很多新的特性，比如Composition API、Teleport、Fragments等。

### 答案示例

Vue.js 3相比Vue.js 2有以下主要的改动：

1. **性能改进**：Vue.js 3的运行时版本体积比Vue.js 2小了约一半，初次渲染速度快了约1.3-2倍，更新速度快了约1.1-1.5倍。
2. **Composition API**：Vue.js 3引入了Composition API，提供了一种更灵活的方式来组织和复用代码，解决了Vue.js 2中大型项目代码组织的问题。
3. **Teleport**：Vue.js 3引入了新的Teleport组件，允许我们将子组件渲染到DOM的其他位置。
4. **Fragments**：Vue.js 3支持Fragments，也就是组件可以有多个根节点。
5. **更好的TypeScript支持**：Vue.js 3的源码完全使用TypeScript编写，提供了更好的TypeScript支持。
6. **自定义渲染器API**：Vue.js 3提供了更灵活的自定义渲染器API，允许我们创建自定义的渲染器。
7. **Proxy-based观察机制**：Vue.js 3使用Proxy替换了Vue.js 2的Object.defineProperty，解决了Vue.js 2无法检测到属性添加和删除的问题。

以上，这些都是Vue.js 3相比Vue.js 2的主要改动。

### 关键点脑图

```markdown
- Vue.js 3相比Vue.js 2的主要改动
  - 性能改进
    - 更小的体积，更快的渲染速度
  - Composition API
    - 提供了一种更灵活的方式来组织和复用代码
  - Teleport
    - 允许我们将子组件渲染到DOM的其他位置
  - Fragments
    - 组件可以有多个根节点
  - 更好的TypeScript支持
    - 源码完全使用TypeScript编写
  - 自定义渲染器API
    - 允许我们创建自定义的渲染器
  - Proxy-based观察机制
    - 使用Proxy替换了Vue.js 2的Object.defineProperty

```