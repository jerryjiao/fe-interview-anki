# javascript基础知识

## JS的数据类型有哪些？

### 答题思路

这是一道考察 JavaScript 基础知识的理论题，主要是询问 JavaScript 有哪些数据类型。在回答这个问题时，我们需要列出 JavaScript 所有的数据类型，并对每种类型进行简要的解释。

### 答题关键点

1. JavaScript 数据类型：原始类型（Primitive Type）和对象类型（Object）。
2. 原始类型：包括 Undefined、Null、Boolean、Number、String、Symbol（ES6 新增）、BigInt（ES10 新增）。
3. 对象类型：包括 Object、Array、Function、Date 等。

### 答案示例

JavaScript 的数据类型主要可以分为两大类：原始类型（Primitive Type）和对象类型（Object）。

原始类型包括：

1. **Undefined**：只有一个值，即 `undefined`。
2. **Null**：只有一个值，即 `null`。
3. **Boolean**：有两个值，`true` 和 `false`。
4. **Number**：可以是任何数值，包括正数、负数和特殊值如 `NaN`（不是一个数）、`Infinity`（无穷大）、`Infinity`（无穷小）等。
5. **String**：表示文本数据，可以是任何长度的 Unicode 文本。
6. **Symbol**：（ES6 新增）每个 Symbol 的值都是唯一的，用于保证对象属性的唯一性。
7. **BigInt**：（ES10 新增）可以表示任意大的整数。

对象类型主要有：

1. **Object**：JavaScript 中的对象是键值对的集合，是一种复合类型，可以包含其他数据类型的值。
2. **Array**：是一种特殊的对象，用于表示有序的数据集合。
3. **Function**：函数实际上也是一种对象，它是可调用的对象。
4. **Date**：用于处理日期和时间的内置对象。

### 关键点脑图

```markdown
- JavaScript 数据类型
  - 原始类型
    - Undefined
    - Null
    - Boolean
    - Number
    - String
    - Symbol
    - BigInt
  - 对象类型
    - Object
    - Array
    - Function
    - Date

```
## 解释一下原型链

### 答题思路

这是一道考察 JavaScript 面向对象编程中原型链概念的理论题。在回答这个问题时，需要解释清楚什么是原型链，原型链的作用，以及 JavaScript 中原型链的工作原理。

### 答题关键点

1. 原型链的定义：原型链是 JavaScript 中实现对象继承的主要机制。
2. 原型链的作用：通过原型链，一个对象可以使用它的原型上的属性和方法，也可以使用原型的原型上的属性和方法。
3. JavaScript 中的原型链工作原理：当试图访问一个对象的属性时，JavaScript 会首先在对象本身的属性中查找，如果没有找到，那么 JavaScript 会在该对象的原型（即它的 `__proto__` 属性，也就是它的构造函数的 `prototype` 属性）中查找，如果还没有找到，就会去原型的原型中查找，依此类推，直到找到属性或达到原型链的末端（`null`）。

### 答案示例

在 JavaScript 中，每一个对象都有一个内部属性 [[Prototype]]，它指向了该对象的原型。当我们访问一个对象的属性时，如果这个对象自身没有这个属性，那么 JavaScript 就会去它的 [[Prototype]] 所指向的原型对象上去找，这就形成了一条原型链。

这种通过原型链查找属性的方式，使得我们可以在对象上调用不属于该对象自身但属于其原型或原型链上的其他对象的方法或属性，实现了一种类似于继承的功能。

例如，当我们创建一个新的数组，比如 `let arr = []`，这个数组自身是没有 `push` 方法的，但我们可以调用 `arr.push(1)`，这是因为 `arr` 的原型（也就是 `Array.prototype`）上有 `push` 方法，当我们调用 `arr.push` 时，JavaScript 就会沿着原型链去查找 `push` 方法。

总的来说，原型链是 JavaScript 实现继承和属性查找的重要机制。

### 关键点脑图

```markdown
- 原型链
  - 定义：原型链是 JavaScript 实现对象继承的主要机制
  - 作用：通过原型链，一个对象可以使用它的原型上的属性和方法
  - 工作原理
    - 查找属性：先在对象本身查找，未找到则在原型上查找，依次沿着原型链向上查找，直到找到或到达 `null`

```
## 描述一下 this 关键字的工作原理。

### 答题思路

这是一道考察 JavaScript 中 `this` 关键字使用和工作原理的理论题。在回答这个问题时，需要解释清楚 `this` 的含义以及在不同情况下 `this` 的指向。

### 答题关键点

1. `this` 的定义：`this` 是 JavaScript 中的一个关键字，它代表函数运行时的上下文对象。
2. `this` 的指向：在全局环境、函数调用、方法调用、构造函数、箭头函数和 `call/apply/bind` 中 `this` 的指向。

### 答案示例

在 JavaScript 中，`this` 是一个特殊的变量，它在每个函数内部都有定义，指向函数的运行环境或者说上下文。`this` 的值取决于函数的调用方式，具体如下：

1. **全局环境**：在全局环境中（不在任何函数中），`this` 指向全局对象。在浏览器中，全局对象就是 `window`。
2. **函数调用**：如果一个函数不是作为对象的方法调用，那么 `this` 通常指向全局对象。严格模式下，`this` 会是 `undefined`。
3. **方法调用**：如果一个函数作为对象的方法调用，`this` 就指向那个对象。
4. **构造函数**：在构造函数中，`this` 指向正在被构造的新对象。
5. **箭头函数**：箭头函数没有自己的 `this`，箭头函数中的 `this` 与定义箭头函数时的环境中的 `this` 保持一致。
6. **call/apply/bind**：使用 `call`、`apply` 或 `bind` 可以手动设置函数中 `this` 的指向。

需要注意的是，`this` 的指向是在函数调用时确定的，而不是在函数定义时确定。

### 关键点脑图

```markdown
- this 关键字
  - 定义：this 是函数运行时的上下文对象
  - 指向
    - 全局环境：指向全局对象
    - 函数调用：指向全局对象（非严格模式），undefined（严格模式）
    - 方法调用：指向调用方法的对象
    - 构造函数：指向正在被构造的新对象
    - 箭头函数：没有自己的 this，指向定义箭头函数时的环境中的 this
    - call/apply/bind：指向手动设置的对象

```
## JS中new做了什么？

### 答题思路

这是一个关于JavaScript基本概念和原理的问题，可以从以下几个方面来回答：

1. 创建一个新的空对象
2. 设置这个新对象的__proto__属性指向构造函数的prototype对象
3. 将构造函数的作用域赋给新对象（也就是将this指向新对象）
4. 执行构造函数中的代码（为这个新对象添加属性）
5. 如果构造函数返回了一个对象，那么返回该对象，否则，返回步骤1创建的新对象。

### 答题关键点

- 创建空对象
- 设置原型链
- 赋予新对象作用域
- 执行构造函数
- 返回对象

### 答案示例

在JavaScript中，当我们使用`new`操作符调用一个函数时，其实做了以下几个步骤：

```jsx
function newOperator(Con, ...args) {
  // 1. 创建一个新的空对象
  let obj = Object.create(null);
  // 2. 设置这个新对象的__proto__属性指向构造函数的prototype对象
  obj.__proto__ = Con.prototype;
  // 3. 将构造函数的作用域赋给新对象（也就是将this指向新对象）
  let result = Con.apply(obj, args);
  // 4. 执行构造函数中的代码（为这个新对象添加属性）
  // 5. 如果构造函数返回了一个对象，那么返回该对象，否则，返回步骤1创建的新对象。
  return result instanceof Object ? result : obj;
}

```

### 关键点脑图

```
- new操作符
  - 创建空对象
  - 设置原型链
    - 新对象的__proto__属性指向构造函数的prototype对象
  - 赋予新对象作用域
    - 将this指向新对象
  - 执行构造函数
    - 为新对象添加属性
  - 返回对象
    - 如果构造函数返回了一个对象，返回该对象
    - 否则，返回新创建的对象

```
## 描述一下闭包，以及它的使用场景。

### 答题思路

这是一道基本的 JavaScript 概念题，旨在测试面试者对闭包的理解和实际应用。回答这个问题时，我们首先要解释什么是闭包，然后再描述它的使用场景。

### 答题关键点

- 闭包定义
- 闭包的使用场景
- 代码示例

### 答案示例

在 JavaScript 中，闭包是一种可以访问其自身作用域、外部函数作用域和全局作用域的函数。它是由函数和创建该函数的词法环境的引用组合而成的。这使得在函数被调用时，即使外部函数已经完成执行，闭包仍然可以访问外部函数的变量和参数。

闭包的常见使用场景如下：

1. 数据封装和私有方法：闭包可以隐藏内部实现细节，只暴露一些接口供外部调用，形成私有变量或方法。
2. 事件处理程序和回调：在 JavaScript 中，异步操作、定时器和事件监听器常常需要使用闭包，因为闭包能保存状态和变量。
3. 实现装饰器：闭包可以用于在不改变原函数的情况下，增加新的功能或行为。

以下是一段使用闭包进行数据封装的示例代码：

```jsx
function createCounter() {
    let count = 0;
    return function() {
        return ++count;
    };
}

const counter = createCounter();
console.log(counter()); // 输出：1
console.log(counter()); // 输出：2

```

在这个例子中，`createCounter`函数返回一个匿名函数，该匿名函数可以访问到它的父作用域`createCounter`函数中的`count`变量。即使`createCounter`函数已经执行完毕，但是返回的匿名函数仍然可以访问`count`变量，这就形成了一个闭包。

### 关键点脑图

```markdown
- 闭包
  - 定义: 一个函数和其相关的词法环境的组合
  - 使用场景
    - 数据封装和私有方法
    - 事件处理程序和回调
    - 实现装饰器
  - 示例代码
    - 创建一个计数器

```
## JS如何实现类

### 答题思路

这个问题是一个JavaScript的面向对象编程问题，询问的是如何在JavaScript中实现类。我们可以从以下几个角度进行回答：

1. ES6及其之后版本中的类实现方式
2. ES5及其之前版本中通过函数和原型链实现类的方式
3. JavaScript中类的一些基本特性，如构造函数、实例方法、静态方法等

### 答题关键点

- ES6中的类定义
- ES5中的函数和原型链实现类
- 构造函数
- 实例方法
- 静态方法

### 答案示例

在JavaScript中，实现类有两种主要的方式，分别是ES6的语法糖方式和ES5的原型链方式。

1. 在ES6及其之后的版本中，我们可以使用`class`关键字定义类：

```jsx
class MyClass {
  constructor(param1, param2) {
    // 构造函数
    this.param1 = param1;
    this.param2 = param2;
  }

  instanceMethod() {
    // 实例方法
    return this.param1 + this.param2;
  }

  static staticMethod() {
    // 静态方法
    return 'This is a static method';
  }
}

```

1. 在ES5及其之前的版本中，我们需要使用函数和原型链来实现类：

```jsx
function MyClass(param1, param2) {
  // 构造函数
  this.param1 = param1;
  this.param2 = param2;
}

MyClass.prototype.instanceMethod = function() {
  // 实例方法
  return this.param1 + this.param2;
};

MyClass.staticMethod = function() {
  // 静态方法
  return 'This is a static method';
};

```

### 关键点脑图

```
- JavaScript类
  - ES6
    - class关键字
    - constructor构造函数
    - 实例方法
    - 静态方法
  - ES5
    - 函数和原型链
    - 构造函数
    - 实例方法
    - 静态方法

```
## JS如何实现继承

### 答题思路

这是一个关于JavaScript面向对象编程的问题，询问的是如何在JavaScript中实现类的继承。我们可以从以下几个角度进行回答：

1. ES6及其之后版本中的类继承方式
2. ES5及其之前版本中通过原型链和构造函数实现类继承的方式
3. JavaScript中继承的一些基本特性，如子类、父类、超类调用等

### 答题关键点

- ES6中的类继承
- ES5中的原型链和构造函数实现类继承
- 子类
- 父类
- 超类调用

### 答案示例

在JavaScript中，实现类的继承有两种主要的方式，分别是ES6的语法糖方式和ES5的原型链与构造函数的方式。

1. 在ES6及其之后的版本中，我们可以使用`class`和`extends`关键字定义子类：

```jsx
class SuperClass {
  constructor(param) {
    this.param = param;
  }

  superMethod() {
    return this.param;
  }
}

class SubClass extends SuperClass {
  constructor(param, subParam) {
    super(param);  // 调用父类构造函数
    this.subParam = subParam;
  }

  subMethod() {
    return this.subParam;
  }
}

```

1. 在ES5及其之前的版本中，我们需要使用原型链和构造函数来实现类的继承：

```jsx
function SuperClass(param) {
  this.param = param;
}

SuperClass.prototype.superMethod = function() {
  return this.param;
};

function SubClass(param, subParam) {
  SuperClass.call(this, param);  // 调用父类构造函数
  this.subParam = subParam;
}

SubClass.prototype = Object.create(SuperClass.prototype);  // 建立原型链
SubClass.prototype.constructor = SubClass;  // 修正构造函数
SubClass.prototype.subMethod = function() {
  return this.subParam;
};

```

### 关键点脑图

```
- JavaScript继承
  - ES6
    - class关键字
    - extends关键字
    - super超类调用
  - ES5
    - 原型链
    - 构造函数调用
    - Object.create
    - constructor修正

```
## 描述一下 JavaScript 的异步编程，以及 Promise、async/await 的使用。

### 答题思路

这是一个关于JavaScript异步编程的问题，包含三个主要部分：JavaScript的异步编程，Promise的使用，以及async/await的使用。我们可以分别对这三个部分进行描述。

### 答题关键点

- JavaScript的异步编程
- Promise的使用
- async/await的使用

### 答案示例

1. JavaScript的异步编程：JavaScript是单线程的，但它通过事件循环（Event Loop）实现了非阻塞I/O操作。在JavaScript中，当一个异步任务被发起，它会被放到事件队列中，而不会立即执行。事件循环会不断地检查这个队列，当事件准备好被处理时（例如：一个定时器已经到期，或者一个Ajax请求已经返回数据），事件循环会将其放到调用栈中执行。
2. Promise的使用：Promise是JavaScript中处理异步操作的一种方式，它代表了一个可能已经完成、可能还没有完成的异步操作的结果。Promise对象有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。状态的改变只能是：pending到fulfilled，或者pending到rejected，状态一旦改变，就不会再变。

```jsx
let promise = new Promise((resolve, reject) => {
  // 异步操作
  if (/* 操作成功 */) {
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(value => {
  // success
}).catch(error => {
  // failure
});

```

1. async/await的使用：async/await是ES7引入的，用于简化Promise的使用，使异步代码看起来更像同步代码。`async`表示一个函数是异步的，函数的返回值将是一个Promise。`await`只能在`async`函数中使用，表示等待一个Promise解析，然后返回结果值。

```jsx
async function asyncFunc() {
  try {
    let value = await promise;
    console.log(value);
  } catch (error) {
    console.log(error);
  }
}

```

### 关键点脑图

```
- JavaScript异步编程
  - 单线程
  - 事件循环
  - 非阻塞I/O操作
- Promise
  - 状态：pending、fulfilled、rejected
  - then方法
  - catch方法
- async/await
  - async表示函数是异步的
  - await等待Promise解析
  - 错误处理

```