# React
Q: React的生命周期

A: 
![-w652](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16188014154077.jpg)
Mounting：已插入真实 DOM
* componentWillMount 在渲染前调用,在客户端也在服务端。

* componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。
Updating：正在被重新渲染
* shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。
可以在你确认不需要更新组件时使用。

* componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

* componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。
Unmounting：已移出真实 DOM
* componentWillUnmount在组件从 DOM 中移除之前立刻被调用。

Q: 为什么setSate有异步更新
A: 
React在执行setState之后，要执行render、diff、更新DOM等一系列操作，性能开销是比较大的。加入异步更新、更新合并等策略能优化性能。

组件里等事件处理程序，如 onClick={this.handleClick} 里面等setState是异步更新。声明生命周期函数里等setState也是异步更新。如果需要多次更新需要用异步设置等语法，如
```
this.setState((state, props) => {
  return {count: state.count + props.count }
})
```
其他地方，如setTimeout里，对原生绑定如 addEventListener 里，都是同步更新。

setState函数的第二个参数允许传入回调函数，在状态更新完毕后进行调用，譬如：
```
    this.setState({
      load: !this.state.load,
      count: this.state.count + 1
    }, () => {
      console.log(this.state.count);
      console.log('加载完成')
    });
```

Q: 受控组件与非受控组件是什么

A:
```
<FInput value={x} onChange={fn}/> 受控组件
<FInput defaultValue={x} ref={input}/> 非受控组件
```
区别受控组件的状态由开发者维护，非受控组件的状态由组件自身维护（不受开发者控制）,用ref获取组件的值

Q: shouldComponentUpdate有什么用?

A:
用于在没有必要更新 UI 的时候返回 false，以提高渲染性能

Q: 必考：React 如何实现组件间通信？

A:   
    1. 父子靠 props 传函数
    2. 爷孙可以穿两次 props
    3. 任意组件用 Redux（也可以自己写一个 eventBus）
Q: 必考：shouldComponentUpdate 有什么用？

A:    
    1. 要点：用于在没有必要更新 UI 的时候返回 false，以提高渲染性能
    2. 参考：harettp://taobaofed.org/blog/2016/08/12/optimized-react-components/
    
Q: 必考：虚拟 DOM 是什么？

A:    
    1. 要点：虚拟 DOM 就是用来模拟 DOM 的一个对象，这个对象拥有一些重要属性，并且更新 UI 主要就是通过对比（DIFF）旧的虚拟 DOM 树 和新的虚拟 DOM 树的区别完成的。
    2. 参考：http://www.alloyteam.com/2015/10/react-virtual-analysis-of-the-dom/
    
Q: 必考：什么是高阶组件？

A:    
    1. 要点：文档原话——高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。
    2. 举例：React-Redux 里 connect 就是一个高阶组件，比如 connect(mapState)(MyComponent) 接受组件 MyComponent，返回一个具有状态的新 MyComponent 组件。

Q: React diff 的原理是什么？

A:  
 看你记忆力了：https://imweb.io/topic/579e33d693d9938132cc8d94

Q: 必考 Redux 是什么？

A:    
    1. 背下文档第一句：Redux 是 JavaScript 状态容器，提供可预测化的状态管理。重点是『状态管理』。
    2. 说出核心概念的名字和作用：Action/Reducer/Store/单向数据流
    3. 说出常用 API：store.dispatch(action)/store.getState()

<h3 id="5">5. Redux</h3>

Redux 是一个 **数据管理中心**，可以把它理解为一个全局的 data store 实例。它通过一定的使用规则和限制，保证着数据的健壮性、可追溯和可预测性。它与 React 无关，可以独立运行于任何 JavaScript 环境中，从而也为同构应用提供了更好的数据同步通道。

- **核心理念**:
	- **单一数据源**: 整个应用只有唯一的状态树，也就是所有 state 最终维护在一个根级 Store 中；
	- **状态只读**: 为了保证状态的可控性，最好的方式就是监控状态的变化。那这里就两个必要条件：
		- Redux Store 中的数据无法被直接修改；
		- 严格控制修改的执行；
	- **纯函数**: 规定只能通过一个纯函数 (Reducer) 来描述修改；

- 大致的数据结构如下所示:

![](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16188255597619.jpg)




- **理念实现**:
	- **Store**: 全局 Store 单例， 每个 Redux 应用下只有一个 store， 它具有以下方法供使用:
		- `getState`: 获取 state；
		- `dispatch`: 触发 action, 更新 state；
		- `subscribe`: 订阅数据变更，注册监听器；
	
	```js
	// 创建
	const store = createStore(Reducer, initStore)
	```
	
	- **Action**: 它作为一个行为载体，用于映射相应的 Reducer，并且它可以成为数据的载体，将数据从应用传递至 store 中，是 store **唯一的数据源**；

	```js
	// 一个普通的 Action
   const action = {
		type: 'ADD_LIST',
		item: 'list-item-1',
	}
	
	// 使用：
	store.dispatch(action)
	
	// 通常为了便于调用，会有一个 Action 创建函数 (action creater)
	funtion addList(item) {
		return const action = {
			type: 'ADD_LIST',
			item,
		}
	}
	
	// 调用就会变成:
	dispatch(addList('list-item-1'))
	```
		
	- **Reducer**: 用于描述如何修改数据的纯函数，Action 属于行为名称，而 Reducer 便是修改行为的实质；

	```js
	// 一个常规的 Reducer
	// @param {state}: 旧数据
	// @param {action}: Action 对象
	// @returns {any}: 新数据
	const initList = []
	function ListReducer(state = initList, action) {
		switch (action.type) {
			case 'ADD_LIST':
				return state.concat([action.item])
				break
			defalut:
				return state
		}
	}
	```
		
	> **注意**:
	>
	> 1. 遵守数据不可变，不要去直接修改 state，而是返回出一个 **新对象**，可以使用 `assign / copy / extend / 解构` 等方式创建新对象；
	> 2. 默认情况下需要 **返回原数据**，避免数据被清空；
	> 3. 最好设置 **初始值**，便于应用的初始化及数据稳定；
	
Q: connect 的原理是什么？

A:  
 react-redux 库提供的一个 API，connect 的作用是让你把组件和store连接起来，产生一个新的组件（connect 是高阶组件）
 参考：https://segmentfault.com/a/1190000017064759
 