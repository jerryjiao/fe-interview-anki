# javascript基础知识

## 变量类型和计算

### 知识点
* 变量类型
* 变量计算
* truely和falsely变量

#### 变量类型

Q: 基本类型有哪些

A:

* Null
* Boolean
* Number
* String
* Undefined
* Symbol（ES6加入）

Q: 引用类型有哪些？

A:

- 对象
- 数组
- 函数
- Date
- RegExp（正则）


Q: 原始类型与引用类型的区别

A:

大部分语言都可以分为两种类型：
值类型和引用类型，引用类型也是为了提升代码的执行效率

值类型是存在`栈内存`中的。可以想象下图所示。值类型是不可改变的。也就是复制给一个新的变量的话，新变量改变，老的变量不会改变。

![-w532](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/04/16/16185414439608.jpg)


引用类型存在`堆栈内存`中的。可以想象下图所示，有点相当于地址簿，栈中存储的只是一个内存的地址，真正的数据存在这个内存地址中。引用类型是可以改变的。也就是复制给一个新的变量的话，新变量改变，老的变量也会改变。
![-w537](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/04/16/16185414566333.jpg)



Q: `typeof` 能判断哪些类型？

A:
基本类型，除了null都能准确识别，null会被识别为Object。
引用类型，只能识别出function，其它都会被识别为Object。


#### 变量计算

Q: 如何进行字符串拼接？

A:

可以使用 `+` 符号

```js
const a = 10 + 10 // 20
const b = 10 + '10' // '1010'
const c = undefined + 10 //NaN
const d = undefined + '10' // 'undefined100'
```

Q: `==` 与 `===` 的区别

A:

`==` 会进行自动类型转换

`===`不会自动类型转换

推荐平时使用用 `===`

Q: 什么是 falsely 变量？

A:

falsely 变量就是双非之后为 `false` 的变量

```js
!! NaN === false
```

if 判断和逻辑运算，都是判断 truely 和 falsely 变量而不是直接判断 `true` 和 `false`

例如：

```js
'' && '10' // ''
100 || NaN // 100
```

Q: 怎样区分 truely 和 falsely 变量

A:

以下为 falsely 变量：
*  0
*  NaN
*  ''
*  null
*  undefined
*  false

其它都是 truely 变量

Q: 深拷贝和浅拷贝的区别

A: 
浅拷贝和深拷贝的区别主要是针对引用类型。
如果是深拷贝，复制后的变量改变，不会影响老的变量。
浅拷贝，只是复制地址，复制后的变量改变，也会影响老的变量。

### 题目

Q: 手写深拷贝

A:

```js
function deepClone(entry) {
    let result = null
    // step1: 如果入参是值类型就返回
    if(typeof entry !== 'object' || entry == null) {
        // 递归真正执行的语句
        return entry
    }
    // Step2: 定义result 类型
    if(entry instanceof Array) {
        result = []
    } else {
        result = {}
    }

    // Step3:
    for(let key in entry) {
        // 对原型的处理
        if(entry.hasOwnProperty(key)){
            // 此处递归
            result[key] = deepClone(entry[key])
        }
    }

    return result
}
```

## 作用域和闭包

### 知识点

* 编译阶段和执行阶段
* 作用域和自由变量
* 闭包
* this

#### 编译阶段和执行阶段

Q: 编译阶段和执行阶段的区别
js是解释型的语言，代码执行有两个阶段，编译阶段和执行阶段。在执行阶段之前，会先预解析代码，为执行代码做准备。
* 编译阶段
声明前置
词法作用域
根据规范抛出特定的错误
生成运行时需要的代码。

* 执行阶段
解析被使用的代码
生成 AST
执行上下文
动态作用域
抛出所有的语法错误
  

Q: 什么是声明前置?

A: 就是在`编译阶段`，函数声明和变量声明都会放在最前面。但只是声明放在前面，变量不会赋值，函数不会执行。如果名字相同，函数声明会覆盖变量声明。

例如以下代码：
```
console.log( a )
var a = 1
function a(){}
console.log( a )
```
可以等价于：
```
var a
function a(){}

console.log( a ) // function a(){}
a = 1
console.log( a ) // 1
```
#### 作用域

Q: 什么是作用域?

A:

就是变量作用的范围，如图所示即为作用域（这里图要换）

![](https://raw.githubusercontent.com/jerryjiao/imageUrl/master/1.png?token=ADBBE7CEZHFJFXGBTWBPWEK52VJIE)

作用域在代码预解析阶段就确定了

Q: 作用域分几种类型？

A:

* 全局作用域
* 函数作用域
* 块级作用域（ES6，let，const）

Q: 什么是暂时性死区?

A: 
let,const 声明的变量，存在暂时性死区。在当前块级作用域中，let,const 声明的变量，在赋值之前，都不能对该变量进行额外的访问与操作，否则就会报错。(引用)


Q: 什么是自由变量？自由变量的值是什么时候定义？怎么寻找？

A:

* 一个变量在当前作用域没有定义，但被使用了
* 自由变量时在定义函数的时候，值就确定了（一定是在定义的时候，而不是执行的时候）
* 函数在执行的过程中，先从自己内部找变量
* 如果找不到，再从`创建当前函数所在的作用域`去找, 以此往上
* 如果找不到，会报错 xx is not defined

#### 闭包 

Q: 什么是闭包？

A:

如果在函数里面可以访问外面的变量，那么这个`函数` + 这些 `变量` = `闭包`

闭包在代码解析时就能确定。

![-w453](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/04/16/16185414927693.jpg)


Q: 闭包的两种情况

A:

1. 函数作为参数

    ```js
    function create(fn) {
        let a = 200
        fn()
    }

    function fn() {
        console.log(a)
    }

    create(fn) // 200
    ```

2. 函数作为返回值被返回

    ```js
    function create() {
        let a = 100
        return function(){
            console.log(a)
        }
    }
    ```
    
#### this

Q: this是在什么时候被确定的？
A: this 的指向，是在执行上下文的创建过程中，被确定的。

明确了这一点，我们就很容易知道，只有在函数调用时，this 的指向才会被确定。

Q: this的不同场景，怎么取值？

A:

做this题的思路就是转换为.call函数，然后看第一个参数是什么。第一个参数，就是最后执行那个函数的点之前的对象。如果没有，就是Undefied，在严格模式下是undefined，非严格模式下是window

```js
fn() {
    console.log(this)
}
相当于 fn.call(undefined) 如果是undefined就是window
fn() // 普通函数，this为window
----------------------------------------------
obj = {
    fn: fn
}
obj.fn() // 作为对象方法，this的值为这个对象
----------------------------------------------
const fn2 = fn.bind({a:1})
fn2()  // 使用bind/call/apply的话，this即为传入的{a:1}
----------------------------------------------
const b = ()=> {console.log(b)}

obj2 = {
    b:b
}
obj2.b()// 箭头函数的this继承父级,这里会打印出window
----------------------------------------------
const c = new fn() // new之后，this会绑定在实例c上
```

Q: call, bind, apply的区别

A: 
 call，bind, apply 都会绑定当前作用域下的this
 call,apply和Bind的区别的区别是，bind方法会返回一个绑定当前this的新函数，但不会执行，call, apply会执行。
 
 call, apply主要就是传参的格式不同，call是把参数，一个一个传入，apply是通过一个数组传入

### 题目

Q: bind 方法有什么作用？手写 bind 函数

A:

`bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被 `bind` 的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

```js
// 模拟 bind
Function.prototype.bind1 = function() {
    // 将参数拆解为数组
    const args = Array.prototype.slice.call(arguments)

    // 获取this（数组第一项）
    const t = args.shift()

    // fn1.bind(...)中的fn1
    const self = this

    // 返回一个函数
    return function () {
        return self.apply(t, args)
    }
}
```

Q: 实际开发中的闭包场景，举例说明 （引用）

A:

* 隐藏数据
* 做一个简单的cache工具 //TODO: 这是什么意思


Q: 创建10个 `<a>` 标签，点击的时候弹出对应的对象（引用）

```js
let a
for(let i=0;i<10;i++) {
    a=document.createElement('a')
    a.innerHTML = i + '<br>'
    a.addEventListener('click', function(e){
        e.preventDefault()
        alert(i)
    })
    document.body.appendChild(a)
}
```

Q: 以下代码的执行结果（引用）

```js
function create() {
    let a = 200
    return function(){
        console.log(a)
    }
}
let fn = create()
let a = 100
fn()
```

A: 200

Q: 以下代码的执行结果（引用）

```js
function print(fn) {
    let a = 200
    fn()
}

let a = 100
function fn() {
    console.log(a)
}
print(fn)
```

A: 100

Q: 以下题目中的 this 指向哪里？

```js
const children = {
    watching() {
        setTimeout(function(){
            console.log(this)
        })
    }
}
```

A:

这里会打印出 `window` ,因为在 `setTimeout` 中，是一个普通函数的执行。

如果想指向这个对象，可以把这个函数变为箭头函数。

Q: 以下函数的执行结果
```
var app = {
    fn1() {
        setTimeout(function(){
            console.log(this)
        }, 10)
    },
    fn2() {
        setTimeout(()=>{
            console.log(this)
        },20)
    },
    fn3() {
        setTimeout((function(){
            console.log(this)
        }).bind(this), 30)        
    },
    fn4: ()=> {
        setTimeout(()=>{
            console.log(this)
        },40)        
    }
}
app.fn1()
app.fn2()
app.fn3()
app.fn4()
```

A:

```
var app = {
    fn1() {
        function fn(){
            console.log(this)
        }
        //过10ms 后执行
        //fn.call(undefined) ，所以输出 Window
    },
    fn2() {
        //过20ms 执行箭头函数
        //箭头函数里面没资格有 自己的 this，借用 setTimeout 外面的 this，也就是 app
    },
    fn3() {
        // 创建了一个新函数，这个新函数里面绑定了 外面的this，也就是 app
        // 20 ms 后执行新函数，输出 this，也就是刚刚绑定的 app    
    }
    fn4: ()=> {
        //过40ms 执行箭头函数
        //箭头函数里面没资格有 this，用 setTimeout 外面的 this
        //setTimeout 所在的 fn4也是箭头函数，没资格拥有自己的 this，借用外面的 this ，也就是 Window     
    }
}
```

## 面向对象
* 原型与原型链
* new 
* 继承(原型与class)

### 知识点

#### 原型

Q: new 的几个阶段

A: 
创建一个空对象obj
设置原型链 即 obj . _proto _ = 构造函数.prototype ;
让构造函数中的this指向obj
返回对象obj


Q: `instanceof` 的作用？


A:

判断属于哪个 class 或者哪个构造函数，可以用来判断数组。

class：

```js
class Variety {}
let variety = new Variety();

alert( variety instanceof Variety ); // true
```

构造函数：

```js
function Variety() {}

alert( new Variety() instanceof Variety ); // true
```

Q: 简单介绍原型

A:

* 每个 class 都有 **显式** 原型 prototype 。
* 每个实例都有 **隐式** 原型 `_proto_` 。
* 实例的 `_proto_` 指向对应 class 的 prototype 。

#### 原型链

Q: 简述原型，原型链的执行规则


A:

1. 如果实例中有⾃身属性则直接使⽤⾃身的属性，如果没有则会在⾃身的隐式原型链中去找，
⼀直找到最顶级 Object 为⽌，如果都找不到，则最后返回：`null`
2. 每个构造函数都有⼀个显式原型，且每个显式原型都会对应有⼀个隐式原型，⽽他的隐式原型的⽗级⼜有个显式原型，他们都是⼀级级地往上寻找的，然后⼀直找到树形结构的第⼀层（Object）为终点。
3. instanceof是为判断此实例或构造函数是否是⽗级继承的

#### class

Q: 如何构建一个 class

A:

* constructor
* 属性
* 方法

### 题目

Q: 如何判断数组类型

A:

instanceof

Q: 如何用 class 实现继承？（简单代码实现）

A:

```js
class Animal() {
    constructor(name) {
        this.name = name
    }

    eat() {
        console.log(`${this.name} is eating`)
    }
}

class Dog extends Animal() {
    constructor(name, number) {
        super(name)
        this.number = number
    }
    run() {
        console.log(`${this.name} is running`)
    }
}
```

## 异步与同步

### 知识点
* 单线程和异步
* 应用场景
* 回调地狱和 Promise
* async/await
* eventHub
* 宏任务和微任务 

Q: 同步与异步的区别？

A:

同步会阻塞后面程序的运行，
而异步不会阻塞后面程序的运行。

JS是单线程运行的，只能在同一时间内做一件事，所以JS需要异步

Q: 什么是回调函数？

A:
函数做为参数传入另一个函数，并且在该函数内被调动

例如:
```
function getImg(callback) {
    var imgUrl = 'xxxx'
    callback()
}
```

Q: 什么是回调地狱？ 怎样解决回调地狱的问题？

A: 主要的原因之一是因为回调地狱是代码嵌套，可以使用promise解决promise问题

例如:

```
$.post(url1, (data1) =>{
    console.log(data1)

    $.post(url2, (data2) => {
        console.log(data2)

        $.post(url3, (data3) => {
            console.log(data3)
        })
    })
})

```

Q: Promise 的基本写法

A:
```
function getData(url) {
    return new Promise((resolve, reject) => {
         setTimeout(() => {
                resolve('foo');
            }, 300);
    })
}
```


Q: Promise有几种状态

A:
三种：

1.pending  // 正在执行
2.resolve  // 成功
3.reject   // 拒绝

Q: Promise then 和catch 会怎样改变Promise状态？

A: 
* pending 不会触发任何 then catch 回调
* 状态变为 resolved 会触发后续的 then 回调
* 状态变为 rejected 会触发后续的 catch 回调

Q: 什么是Promise链？

A:
Promise可以链式调用，并且上一个then中return的值，是下一个then的入参
例如
```
start()
  .then(data => {
    // promise start
    console.log('result of start: ', data);
    return Promise.resolve(1); // p1
  })
  .then(data => {
    // promise p1
    console.log('result of p1: ', data);
    return Promise.reject(2); // p2
  })
```

Q: 请简单画出EventHub的流程?

A: 
1. 将 console.log("Hi") 推入调用栈，调用栈会执行代码
2. 执行代码，控制台打印“Hi”，调用栈清空
3. 执行 setTimeout，setTimeout由浏览器定义，不是ES6的内容；将定时器放到Web APIs中，到时间后将回调函数放到回调函数队列中
4. 执行完了setTimeout， 清空调用栈
5. console.log("Bye")进入调用栈，执行，调用栈清空
6. 同步代码被执行完,，回调栈空，浏览器内核启动时间循环机制
7. 五秒之后，定时器将cb1推到回调函数队列中
8. 事件循环将cb1放入调用栈

![-w994](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/04/16/16185407397870.jpg)


Q: async/await 的基本用法?

A: 
1. async/await消灭了异步回调，和Promise相辅相成。
2. 执行async 函数，返回的是Promise对象
3. await 相当于 Promise 的 then
4. try...catch 可以捕获异常，代替了Promise 的 catch

Q: 宏任务与微任务的区别？ 宏任务与微任务有哪些？

A: 

微任务： 其实是es规定的，就是其实是js代码中的一些异步方法（promise）
宏任务： 是w3c规定的一些方法，也就是浏览器中的一些异步方法(settimeout,ajax)

因为微任务是在DOM渲染之前执行的，而宏任务是在DOM渲染之后执行的，所以先执行微任务再执行宏任务。

Q: 宏任务，微任务题的解题思路

A: 
1. 先执行同步代码
2. 再执行微任务代码(await 后面为微任务)
3. 再执行宏任务代码

Q: 代码的执行步骤

A: 
1. 同步代码
2. 执行微任务
3. （尝试触发Dom渲染）
4. 触发EventLoop,执行宏任务

### 题目


Q: 手写用Promise 加载一张图片（异步）

A:

```
function loadImg(src) {
    const p = new Promise(
        (resolve, reject) =>{
            const img = document.createElement('img')
            img.onload = () => {
                resolve(img)
            }
            img.onerror = () => {
                const err = new Error(`图片加载失败${src}`)
                reject(err)
            }
            img.src=src
        }
    )
    return p
}
```

Q: 手写promise

A: 
```
 class Promise2 {
     succeed = null
     fail = null
     state = 'pending'

     constructor(fn) {
         fn(this.resolve.bind(this), this.reject.bind(this))
     }
     resolve(result) {
         setTimeout(() => {
         this.state = 'fulfilled'
         this.succeed(result)
         })
     }

     reject(reason) {
         setTimeout(() => {
         this.state = 'rejected'
         this.fail(reason)
         })
     }

     then(succeed, fail) {
         this.succeed = succeed
         this.fail = fail
     }
 }
```


Q: 以下如图所示程序的执行结果：
![](https://raw.githubusercontent.com/jerryjiao/imageUrl/master/WX20191120-225142@2x.png)

A: 1,3, 5, 4, 2

Q: 以下代码的执行结果
```
Promise.resolve().then(() => {
    console.log(1)
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})
```

A: 1,3

Q: 以下代码的执行结果
```
Promise.resolve().then(() => { // 返回 rejected 状态的 promise
    console.log(1)
    throw new Error('erro1')
}).catch(() => { // 返回 resolved 状态的 promise
    console.log(2)
}).then(() => {
    console.log(3)
})
```

A: 1,2,3

Q: 以下代码的执行结果
```
Promise.resolve().then(() => { // 返回 rejected 状态的 promise
    console.log(1)
    throw new Error('erro1')
}).catch(() => { // 返回 resolved 状态的 promise
    console.log(2)
}).catch(() => { // 这里是catch
    console.log(3)
})
```

A: 1,2

Q: promise题分析的一些注意点

A: 
await 后面记得也是微任务
![](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16186449998022.jpg)

初始化promise是，函数会立即执行
![](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16186450997532.jpg)
