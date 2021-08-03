---
sidebar: auto
---
# 前端基础知识艾宾浩斯记忆（anki）
## chapter01 变量类型和计算
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

![-w532](media/16185405222345/16185414439608.jpg)


引用类型存在`堆栈内存`中的。可以想象下图所示，有点相当于地址簿，栈中存储的只是一个内存的地址，真正的数据存在这个内存地址中。引用类型是可以改变的。也就是复制给一个新的变量的话，新变量改变，老的变量也会改变。
![-w537](media/16185405222345/16185414566333.jpg)



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
## chapter02 作用域和闭包

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

![-w453](media/16185405222345/16185414927693.jpg)


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

## chapter03 面向对象
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

## chapter04 异步与同步

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

![-w994](media/16185405222345/16185407397870.jpg)


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
![](media/16185405222345/16186449998022.jpg)

初始化promise是，函数会立即执行
![](media/16185405222345/16186450997532.jpg)


## chapter05 JS-Web-API
### 知识点
#### DOM
* DOM本质
* DOM节点操作
* DOM结构操作
* DOM性能

Q: DOM的本质

A:
了解HTML首先要描述xml的概念
xml， 是一种可扩展的标志性结构语言，是一棵树
html是一种特定的xml,规定了一些标签的名称
html是树型结构
dom的本质是从Html语言解析出的一颗树
可以认为 DOM 就是 JS 能识别的 HTML 结构，一个普通的 JS 对象或者数组。
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div>hello world</div>
</body>
</html>
```

Q: 获取节点有哪些方法

A:
```
const a1 = document.getElementById('a1') // 通过元素id选择
const titleList = document.getElementsByClassName('.title') // 通过class选择
const pList = document.getElementsByTagName('p') // 选择所有p元素。返回的是一个集合

const divList= document.querySelectorAll('div')  //TODO这里应该不对 选择所有p元素。返回的是一个集合
```
getElementsByTagName方法返回的是HTMLCollection对象。

querySelectorAll方法返回的是NodeList对象。

两者的区别：

1. getElementsByTagName 获取的是动态集合，querySelector获取的是静态集合。
2. getElementsByTagName更快

Q； 什么是property？(引用小册)

A:

property:
dom是一个对象。通过getxxxxbyxxx方法获取到对象以后，可以通过js修改一些属性，这些属性就是property。property是JS范畴的属性，符合JS的标准
如以下代码,style就是property

```
var pList = document.querySelectorAll('p')
var p = pList[0]
console.log(p.style.width)  // 获取样式
```

Q: 什么是attribute?（引用小册）

A:

attribute:

property 的获取和修改，是直接改变 JS 对象，而 attribute 是直接改变 HTML 的属性，两种有很大的区别。attribute 就是对 HTML 属性的 get 和 set，和 DOM 节点的 JS 范畴的 property 没有关系。

```
var pList = document.querySelectorAll('p')
var p = pList[0]
p.getAttribute('data-name')
p.setAttribute('data-name', 'juejin')
p.getAttribute('style')
p.setAttribute('style', 'font-size:30px;')
```

Q: attribute和property的区别(引用课程)

A:

* property:修改对象属性，不会体现到html结构中
* attribute: 修改html属性，会改变html结构
* 两者都有可能引起DOM重新渲染

Q: 新增/插入节点

A:

```
// 创建节点，然后新增节点
const div = document.getElementById('div')
const span1 = document.createElement('span')
div.appendChild(span1)

// 如果选择已有节点，就是移动节点
const span2 = document.getElementById('span')
div.appendChild(span2)
```

Q: 删除节点

A:
```
const ele = document.getElementById('title')
const child = ele.childNodes
ele.removeChild(child[0])
```

Q: 获取子元素列表

A:
```
const ele = document.getElementById('title')
const child = ele.childNodes
```

Q: 获取父元素

A:
```
const ele = document.getElementById('title')
const parent = ele.parentNode
```

Q: 优化Dom性能（引用）

* 避免频繁的操作Dom
* 可以对一些需要重复利用的做缓存
* 将频繁操作改为一次性操作

#### BOM

Q: 怎样获得用户用的哪个浏览器

A:

```
const uaInfo = navigator.userAgent
const isSafari = uaInfo.indexOf('Safari')
```

Q: 如何获得屏幕的宽和高

A:

```
const screenWidth = screen.width
const screenHeight = screen.height
```

Q: location

A:

Q: 怎样让浏览器前进和后退

A:
```
history.back()
history.forward()
```
### 题目

Q：一次性插入多个DOM节点，考虑性能

A:

利用`document.createDocumentFragment()`，把多次的操作转换为一次操作

```
const fragment = document.createDocumentFragment()

// 把三个节点放入fragment中
fragment.appendChild(span1)
fragment.appendChild(span2)
fragment.appendChild(span3)

// 放完之后，整体放入DOM树中
div.appendChild(fragment)
```
## chapter06 事件绑定
### 知识点
* 事件绑定
* 事件冒泡
* 事件代理

Q: 如何进行事件绑定？
A:
```
const btn = document.getElementById('button')
btn.addEventListener('click', event => {
    alert('clicked')
})
```

Q: 什么是事件冒泡

A:
事件会像冒泡一样，顺着触发元素，一层一层往上冒
就是在上级能监听到，bindEvent其实只是监听
事件冒泡就是说，它的上级元素也能监听到那个事件

事件代理也是应用事件冒泡的机制

Q: 怎样阻止默认操作？

A:
阻止默认事件，例如阻止a的跳转

```
e.preventDefault  // 阻止默认事件
```

Q: 怎样阻止事件冒泡？

A:

```
e.stopPropagation() // 阻止事件冒泡
```

Q: 什么是事件代理？

A:
事件代理，就是当不好确定事件绑定在哪里的时候，
可以统一绑定在父元素上
然后父元素上要加一些判断和操作，
一般用在瀑布流

它的好处是可以少写一些代码，因为不用每个标签都绑定事件，
所以也可以减少浏览器内存占用


### 题目
Q: 编写一个通用的事件监听函数

A:
```
function bindEvent(ele, type, selector, fn) {
    // 如果是有三个参数的话，第三个参数就为fn
    if(fn == null) {
        fn = selector
        selector =null
    }

    ele.addEventListener(type, event => {
        const target = event.target
        if(selector) {
            // 代理绑定，用matched匹配元素
            // 用call传入target绑定this
            if(target.matches(selector)) {
                fn.call(target, event)
            } else {
                fn.call(target, event)
            }
        }
    })
}
```

Q: 无限下拉的图片列表，如何监听每个图片的点击?

A:

* 使用事件代理
* 通过e.target获取触发元素
* 用matches来判断是否触发元素
## chapter07 ajax
### 知识点
* XMLHttpRequest
* 状态码
* 跨域:同源策略， 跨域解决方案

Q: 实现一个get请求(引用)

A:

```
const xhr = new XMLHttpRequest()
xhr.open('GET', '/data/test.json', true)
xhr.onreadystatechange = function () {
    if（xhr.readyState === 4） {
        if(xhr.status === 200) {
            console.log(xhr.responseText)
        }
    }
}
xhr.send(null)
```

Q: 实现一个post请求(引用)

A:
```
const xhr = new XMLHttpRequest()
xhr.open('POST', '/login', true)
xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
        if(xhr.status === 200) {
            console.log(xhr.responseText)
        } else {
            console.log('其它情况')
        }
    }
}

const postData = {
    userName: 'zhangsan',
    password: 'xxx'
}
// 转换为json格式
xhr.send(JSON.stringify(postData))
```

Q: xhr.readyState有哪些状态？

A:

| 值 | 状态 | 描述 |
| --- | --- | --- |
| 0 | UNSENT | (未初始化)代理被创建，但尚未调用 open() 方法。|
| 1 | OPENED | (载入)open() 方法已经被调用。|
| 2	| HEADERS_RECEIVED |	(载入完成)send()方法已经被调用，并且头部和状态已经可获得。|
| 3	| LOADING |	下载中； (交互)responseText 属性已经包含部分数据。 |
| 4	| DONE | (完成)下载操作已完成。|

Q: 请求的状态码有哪些

A:

* 2xx - 成功请求， 例如:200

* 3xx - 重定向, 例如:301 永久重定向， 302临时重定向, 304 服务器表示资源未改变，浏览器会用自己本身的缓存的资源

* 4xx - 客户端错误，例如:404找不到，403客户端没有权限

* 5xx - 服务器端错误


Q: 什么是跨域？

A:

想要理解跨域，就要理解同源。
同源的意思是: 协议， 域名， 端口， 三者一致(必须在一个域下)
ajax请求时，浏览器要求当前网页和server必须同源。
当不是同源的时候，需要使用跨域去解决这个问题

现在所有的跨域，都必须服务端的允许和配合，
未经服务端允许就实现跨域，说明有漏洞



Q: 有哪些标签可以无视同源策略? 有什么作用

A:

注意:
加载图片,css,js可无视同源策略

* `<img src='跨域的图片地址' />`, 可用于统计打点，使用第三方统计服务
* `<ilnk href=‘跨域的css地址’ />`, 可使用CDN， CDN一般是外域
* `<script src='跨域的js地址'></script>`，可实现JSONP

Q: JSONP的原理？（引用）

A:

* `<script> 可以绕过跨域限制`
* 服务器可以任意动态拼接数据返回

其实就是引用一个外部的script， 但是这个script是服务器拼接的，这个拼接的js中一般是有一个函数，这个函数返回需要的数据。这样在页面的就能调用这个函数拿到数据了。

Q: cors是怎样解决跨域问题的？

A:
cors就是服务端在返回的header里面加一下标记，这样来实现跨域

```
// 可以直接写为*
response.setHeader("Access-Control-Allow-Origin", "http://localhost:8011");
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
response.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")ß

// 接受跨域的cookie

response.setHeader("Access-Control-Allow-Credentials", "true");
```

Q: 什么是Restful Api,与之前的method有什么区别？

A：
Restful API 是一种新的API设计方法
* 传统API把每个url当做一个功能
* Restful API，把url当做唯一的资源，用不同的请求方法表示不同的含义
*![-w1061](media/16185405222345/16187545994946.jpg)
![-w1136](media/16185405222345/16187546318661.jpg)
* delete表示删除 
Q: http 有哪些headers?
A: 
request Headers
Accept 浏览器可接受的数据格式
Accept-encoding 浏览器可接受的压缩算法，如gzip(服务器压缩，客户端解压，让传输的资源变小，速度更快)
Accept-Language 浏览器可接收的语言，如zh-CN
Connect：keep-alive 一次TCP连接重复使用
Cookie：同域每次请求资源都会把cookie带上
Host：请求的域名
User-agent：简称UA，浏览器信息，标识是什么浏览器，是什么系统，供给服务器分析
Content-type：发送数据的格式，如application/json（一般get请求是没有的）

Response Headers
Content-type: 返回数据的格式，如application/json
Content-length: 返回数据的大小，多少字节
Content-Encoding: 返回数据的压缩算法，如gzip
Set-Cookie: 服务端需要通过该字段来修改浏览器中的cookie

Q: 为什么需要HTTP缓存？
A: 
①　缓存是什么?
保存资源副本并在下次请求时直接使用该副本的技术。当Web缓存发现请求的资源已经被存储，它会拦截请求，返回该资源的拷贝，而不会去源服务器重新下载。
②　为什么需要缓存
减少不必要的网络请求,使得页面加载更快;
网络请求是不稳定,加大了页面加载的不稳定性;
网络请求的加载相比于cpu加载 & 页面渲染都要慢.
③　哪些资源可以被缓存?
静态资源  js css  img ,
因为静态资源加上hash名打包后是不会修改的

Q: 什么是强制缓存？
A:
服务器觉得资源可以被缓存才会加Cache-Control
(1) Cache-Control 
在Response Headers 中,由服务器添加,客户端不可设置;
控制强制缓存的逻辑,再次请求发现有本地缓存,不使用网络,直接返回资源
max-age  : 资源在多少秒内有效
no-cache : 不使用强制缓存,由服务端决定do what
no-store : 不使用强制缓存,服务端也不缓存,直接由服务端返回新资源
private : 只允许最终用户缓存
pubilc : 用户和中间的代理都能缓存资源
![-w805](media/16185405222345/16187553136578.jpg)
![-w943](media/16185405222345/16187553286229.jpg)

Q: 什么是协商缓存？
A:
![-w811](media/16185405222345/16187553725858.jpg)
![-w792](media/16185405222345/16187553878050.jpg)
![-w966](media/16185405222345/16187554064070.jpg)
![-w858](media/16185405222345/16187554213995.jpg)
![-w757](media/16185405222345/16187554478877.jpg)




### 题目
Q: 手写一个简易的ajax

A:
```
function ajax(url) {
    const p = new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    resolve(
                        JSON.parse(xhr.responseText)
                    )
                } else if (xhr.status === 404) {
                    reject(new Error('404 not found'))
                }
            }
        }
        xhr.send(null)
    })
    return p
}
```
Q: 跨域的常用实现方式

A:

Jsonp
cors

Q: 简单实现一个Jsonp

A:
## 存储
## 性能优化

## vue

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
 ![-w600](media/16185405222345/16187958864113.jpg)

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


## React
// TODO 其实这里可以用自己的话再写一遍，这样就是一篇文章
Q: React的生命周期
A: 
![-w652](media/16185405222345/16188014154077.jpg)
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

![](media/16185405222345/16188255597619.jpg)




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
 
## webpack 相关
Q: webpack的一些关键概念：
A: 
JavaScript 的 模块打包工具 (module bundler)。通过分析模块之间的依赖，最终将所有模块打包成一份或者多份代码包 (bundler)，供 HTML 直接引用。实质上，Webpack 仅仅提供了 打包功能 和一套 文件处理机制，然后通过生态中的各种 Loader 和 Plugin 对代码进行预编译和打包。因此 Webpack 具有高度的可拓展性，能更好的发挥社区生态的力量。

Entry: 入口文件，Webpack 会从该文件开始进行分析与编译；
Output: 出口路径，打包后创建 bundler 的文件路径以及文件名；
Module: 模块，在 Webpack 中任何文件都可以作为一个模块，会根据配置的不同的 Loader 进行加载和打包；
Chunk: 代码块，可以根据配置，将所有模块代码合并成一个或多个代码块，以便按需加载，提高性能；
Loader: 模块加载器，进行各种文件类型的加载与转换；
Plugin: 拓展插件，可以通过 Webpack 相应的事件钩子，介入到打包过程中的任意环节，从而对代码按需修改；

Q: 有哪些常见的Loader？他们是解决什么问题的？
A: 
file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
source-map-loader：加载额外的 Source Map 文件，以方便断点调试
image-loader：加载并且压缩图片文件
babel-loader：让babel来处理最新的js(ts、jsx)语法
css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。

Q: 有哪些常见的Plugin？他们是解决什么问题的？
A: 
HtmlWebpackPlugin: 用于创建最终使用的HTML文件。可自动生成，也可以使用模版创建。
UglifyjsWebpackPlugin: 用于压缩js文件
TerserWebpackPlugin：用于压缩js，更新，支持es6语法
ExtractTextWebpackPlugin: 将所有的入口 chunk中引用的 *.css，移动到独立分离的 CSS 文件

Q: Loader 和 Plugin 有什么差别
A: 
Loader直译为"加载器"。Webpack将一切文件视为模块，Loader让Webpack拥有了加载和解析非JavaScript文件的能力。
Plugin直译为"插件"。Plugin可以扩展Webpack的功能。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

Q: 如何提高Webpack的构建速度
A: 
优化 loader 配置，配置test 、 include 、 exclude
terser-webpack-plugin，开启缓存和多进程压缩
thread-loader 为每个loder开辟单独的进程
cache-loader 给loader设置缓存

 
