## 手写节流，防抖

### 答题思路

这是一道常见的编程题，考察的是函数节流（throttling）和防抖（debouncing）的概念及其实现。在处理如输入、滚动、点击等频繁触发的事件时，节流和防抖技术可以有效控制事件处理函数的执行频率，优化性能。

- **节流（Throttling）**：在一定时间内只执行一次回调，即使在这段时间内触发了多次事件。它保证了在一定时间内一定会执行一次事件处理函数。
- **防抖（Debouncing）**：只有在事件触发后的一段时间内没有再次触发事件，才会执行回调。如果在这段时间内又触发了事件，则重新计算延迟时间。

### 答题关键点

- 理解节流和防抖的概念和使用场景
- 使用JavaScript编写节流和防抖函数

### 答案示例

#### 节流函数

```jsx
function throttle(fn, delay) {
  let last = 0;
  return function(...args) {
    let now = Date.now();
    if (now - last > delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

```

#### 防抖函数

```jsx
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

```

### 关键点脑图

```
# 节流和防抖
- 节流
  - 概念：在一定时间内只执行一次回调
  - 使用场景：处理频繁触发的事件，如滚动、点击等
  - 实现：记录上次执行的时间，新的调用只在指定延迟后执行
- 防抖
  - 概念：在事件触发后的一段时间内没有再次触发，才执行回调
  - 使用场景：输入框内容变化、窗口大小变化等
  - 实现：每次触发事件时清除之前的定时器，重新设置新的定时器

```
## 手写发布订阅

### 答题思路

这是一个编程技巧类的题目，考察的是对设计模式，特别是观察者模式（又称发布-订阅模式）的理解和实现能力。在前端开发中，发布订阅模式常常被用来实现事件的管理和通知机制。回答这个问题的时候，首先要解释清楚发布订阅模式的基本概念和原理，然后通过具体的代码示例展示如何实现。

### 答题关键点

- 发布订阅模式的基本概念
- 发布订阅模式的实现逻辑
- 使用 JavaScript 实现发布订阅模式

### 答案示例

发布订阅模式是一种对象间的一对多的依赖关系，当一个对象的状态发生改变时，所有依赖它的对象都会得到通知。在 JavaScript 中，我们可以通过创建一个对象来管理事件和回调函数，实现发布订阅模式。

```jsx
class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }

  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(subscriberCallback => subscriberCallback !== callback);
    }
  }

  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

// 使用示例
const pubsub = new PubSub();
const logData = data => console.log(`Received data: ${data}`);
pubsub.subscribe('myEvent', logData);
pubsub.publish('myEvent', 'Hello, world!');  // 输出：Received data: Hello, world!
pubsub.unsubscribe('myEvent', logData);

```

在这个示例中，`PubSub`类包含三个方法：`subscribe`、`unsubscribe`和`publish`。`subscribe`方法用于订阅事件和相关的回调函数，`unsubscribe`方法用于取消订阅，`publish`方法用于发布事件，调用所有订阅了该事件的回调函数。

### 关键点脑图

```markdown
- 发布订阅模式
  - 定义
    - 一种对象间一对多的依赖关系
    - 当一个对象状态变更时，所有依赖它的对象都会得到通知
  - 实现
    - 创建一个用于管理事件和回调函数的对象
    - `subscribe`方法用于订阅事件
    - `unsubscribe`方法用于取消订阅事件
    - `publish`方法用于发布事件，触发所有订阅了该事件的回调函数

```
## 手写AJAX

### 答题思路

这是一个编程实现题目，要求实现AJAX的基本功能。AJAX，全称为"Asynchronous JavaScript and XML"，是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。它的核心是JavaScript的核心对象XMLHttpRequest，我们可以使用这个对象进行服务端的数据交互。

回答这个问题的关键在于理解XMLHttpRequest对象的使用，包括创建对象，设置回调函数，打开连接，发送请求等步骤。我们需要一步步解释每一个步骤的含义和作用。

### 答题关键点

1. 创建一个新的XMLHttpRequest对象
2. 设置一个回调函数，处理服务器的响应
3. 使用open方法打开一个到服务器的连接
4. 使用send方法向服务器发送请求

### 答案示例

下面是一个使用AJAX的例子：

```jsx
// 创建一个新的XMLHttpRequest对象
let xhr = new XMLHttpRequest();

// 设置一个回调函数，当请求的状态发生改变时，会调用这个函数
xhr.onreadystatechange = function() {
    // readyState为4表示请求已经完成，status为200表示服务器响应成功
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    }
}

// 使用open方法打开一个到服务器的连接
xhr.open('GET', '<https://api.example.com/data>', true);

// 使用send方法向服务器发送请求
xhr.send();

```

这个例子首先创建了一个XMLHttpRequest对象，然后设置了一个回调函数，当请求的状态发生改变时，这个函数会被调用。在回调函数中，我们检查了readyState和status，如果它们表示请求成功，我们就打印出服务器的响应。

然后，我们使用open方法打开了一个到服务器的连接，最后使用send方法向服务器发送了请求。

### 关键点脑图

```
- AJAX
  - 创建 XMLHttpRequest 对象
  - 设置回调函数
    - 检查 readyState 和 status
    - 打印服务器响应
  - 打开连接
  - 发送请求

```
## 手写简化版Promise

### 答题思路

这是一道编程题，要求手写一个简化版的 Promise。在回答这个问题时，我们需要对 Promise 的基础知识有深入的理解，包括状态管理、resolve 和 reject 函数的实现，以及 then 和 catch 方法的实现。

### 答题关键点

1. Promise 的状态有三种：pending（初始状态）、fulfilled（成功状态）和 rejected（失败状态）。状态一旦改变，就不能再变。
2. Promise 接收一个函数作为参数，该函数接收两个参数，分别是 resolve 和 reject 方法。
3. Promise 实例具有 then 方法和 catch 方法，用于处理 fulfilled 和 rejected 状态。
4. Promise 的链式调用需要每次都返回一个新的 Promise。

### 答案示例

```jsx
class MyPromise {
  constructor(executor) {
    this.status = 'pending';  // 初始状态
    this.value = undefined;  // fulfilled 状态时返回的信息
    this.reason = undefined;  // rejected 状态时返回的信息
    // resolve 函数
    const resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
      }
    };
    // reject 函数
    const reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
      }
    };
    // 立即执行 executor
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  // then 方法
  then(onFulfilled, onRejected) {
    if (this.status === 'fulfilled') {
      onFulfilled(this.value);
    }
    if (this.status === 'rejected') {
      onRejected(this.reason);
    }
  }
}

```

### 关键点脑图

```markdown
- MyPromise
  - status
    - pending
    - fulfilled
    - rejected
  - value
  - reason
  - constructor
    - executor
      - resolve
      - reject
  - then
    - onFulfilled
    - onRejected

```
## 手写深拷贝

### 答题思路

深拷贝是一个常见的编程概念，在 JavaScript 中尤为重要。当我们谈论复制对象时，深拷贝意味着创建一个新的对象，并将原对象的所有属性和方法复制到新对象中，包括嵌套的对象。这意味着在深拷贝对象之后，对原对象的修改不会影响到新对象，反之亦然。

解答这个问题，我们需要使用递归的方法。对于每个属性，我们需要检查它是否为对象。如果是对象，我们需要递归调用深拷贝函数；如果不是对象，我们可以直接复制该值。

此题属于编程实践类问题，需要编写具体的代码来解答。

### 答题关键点

1. 使用递归进行深拷贝。
2. 判断属性值是否为对象，如果是对象则需要继续深拷贝，否则直接复制。
3. 考虑数组的深拷贝。
4. 考虑特殊对象，如 Date，RegExp等。

### 答案示例

```jsx
function deepClone(obj) {
    if (obj === null) return null; // 注意null的情况
    if (obj instanceof RegExp) return new RegExp(obj); // RegExp对象情况
    if (obj instanceof Date) return new Date(obj); // Date对象情况
    if (typeof obj !== "object") {
        // 非复杂类型，直接返回
        return obj;
    }
    // 处理对象和数组（array也是object，所以我们要在这里单独处理）
    let cloneObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 递归调用
            cloneObj[key] = deepClone(obj[key]);
        }
    }
    return cloneObj;
}

```

### 关键点脑图

```
- 深拷贝
  - 基本概念
    - 创建新的对象
    - 复制所有属性和方法
    - 包括嵌套的对象
  - 关键点
    - 使用递归进行深拷贝
    - 判断属性值是否为对象
    - 考虑数组的深拷贝
    - 考虑特殊对象
  - 答案示例
    - 检查null
    - 处理RegExp和Date
    - 非复杂类型直接返回
    - 处理对象和数组
    - 递归调用

```
