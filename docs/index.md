---
sidebar: auto
---
# 前端基础知识艾宾浩斯记忆（anki）
## 变量类型和计算
### 知识点
#### 变量类型

Q: 原始类型有哪些

A: 
* Boolean
* Number
* String
* Null
* Undefined
* Symbol(es6加入)

Q: 引用类型有哪些

A: 对象
   数组
   函数
   Date
   RegExp（正则）

Q: 值类型与引用类型的区别

A: 
   1. 值类型存在栈中
   2. 引用类型存在堆栈中
   3. 复制值类型，新的值改变对老值无影响
   4. 复制引用类型，复制的只是保存这个变量的地址，新的值改变对老值也会跟着改变

Q: typeOf能判断哪些类型

A: 原始类型null会返回object,其它的原始类型都能准确判断。<br />
   引用类型能准确判断function,其它的引用类型如数组等都会判断为object


#### 变量计算

Q: 如何进行字符串拼接

A: 可以使用'+'符号
```
const a = 10+10 // 20
const b = 10 + '10' // '1010'
const c = undefined + 10 //NaN
const d = undefined + '10' // 'undefined100'
```

Q: '==' 与 '==='的区别

A: 
   ‘==’会进行自动类型转换 <br/>
   ‘===’不会自动类型转换 <br/>
   推荐平时使用用

Q: 什么是falsely变量

A: falsely变量就是双非之后为false的变量
```
!! NaN === false
```

if判断和逻辑运算，都是判断truely和falsely变量而不是直接判断true和false
例如：
```
''&&'10' // ''
100 || NaN // 100
```

Q: 怎样区分truely和falsely变量

A: 

以下为falsely变量：
*  0
*  NaN
*  ''
*  null
*  undefined
*  false
其它都是truely变量


### 题目

Q: 手写深拷贝

A: 
```
function deepClone(entry) {
    let result = null
    // step1: 如果入参是值类型就返回
    if(typeof entry!=='object'|| entry==null) {
        // 递归真正执行的语句
        return entry
    }
    // Step2: 定义result 类型
    if(entry instanceof Array) {
        result = []
    } else {
        result ={}
    }

    // Step3:
    for(let key in entry) {
        // 对原型的处理
        if(entry.hasOwnProperty(key)){
            // 此处递归
            result[key]=deepClone(entry[key])
        }
    }
    
    return result 
}
```

## 原型和原型链

### 知识点

#### 原型

Q: instacneOf的作用？

A: 判断属于哪个class或者哪个构造函数，可以用来判断数组

Q: 简单介绍原型

A:

* 每个class都有显示原型 prototype
* 每个实例都有隐式原型 _proto_
* 实例的_proto_指向对应class的prototype

#### 原型链

Q: 简述原型,原型链的执行规则

A: 

1. 如果实例中有⾃身属性则直接使⽤⾃身的属性，如果没有则会在⾃身的隐式原型链中去找，
⼀直找到最顶级Object为⽌，如果都找不到，则最后返回的null
2. 每个构造函数都有⼀个显式原型，且每个显式原型都会对应有⼀个隐式原型，⽽他的
隐式原型的⽗级⼜有个显式原型，他们都是⼀级级往上寻找的，然后⼀直找到树形结构的第⼀层(Object)为终
点。
3. instanceof是为判断此实例或构造函数是否是⽗级继承的

#### class

Q: 如何构建一个Class

A:

* constructor
* 属性
* 方法

### 题目

Q: 如何判断数组类型

A: instanceOf

Q: 如何用class实现继承？（简单代码实现）

A: 
```
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

## 作用域和闭包

### 知识点

* 闭包
* this
* 作用域和自由变量

Q: 什么是作用域?

A: 
就是变量作用的范围，如图所示即为作用域（这里图要换）

![](https://raw.githubusercontent.com/jerryjiao/imageUrl/master/1.png?token=ADBBE7CEZHFJFXGBTWBPWEK52VJIE)


Q: 作用域分几种类型？

A:
* 全局作用域
* 函数作用域
* 块级作用域(es6)

Q: 什么是自由变量？自由变量的值是什么时候定义？怎么寻找？

A: 
* 一个变量在当前作用域没有定义，但被使用了
* 自由变量时在定义函数的时候，值就确定了（一定是在定义的时候，而不是执行的时候）
* 自由变量的值，是向上级作用域寻找，一层一层寻找，直到找到为止
* 如果找不到，会报错 xx is not defined

Q: 什么是闭包？

A: 闭包就是作用域运用的特殊情况
   MDN:
   函数与对其状态即词法环境（lexical environment）的引用共同构成闭包（closure）。也就是说，闭包可以让你从内部函数访问外部函数作用域。在JavaScript，函数在每次创建时生成闭包。

   如果在函数里面可以访问外面的变量，那么这个函数+这些变量 = 闭包

Q: 闭包的两种情况

A: 
1. 函数作为参数被传递
2. 函数作为返回值被返回

Q: 闭包的两种情况请用代码举例

A: 
```
1. 函数作为参数

function create(fn) {
    let a = 200
    fn() 
}

function fn() {
    console.log(a)
}

create(fn)

2. 函数作为返回值被返回

function create() {
    let a = 100
    return function(){
        console.log(a)
    }
}
```
Q: this的不同场景，怎么取值？

A: 
```
fn() {
    console.log(this) 
}
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

### 题目


Q: Bind方法有什么作用？手写bind函数

A: 
bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

```
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
* 做一个简单的cache工具

Q: 创建10个`<a>`标签，点击的时候弹出对应的对象（引用）
```
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

```
function create() {
    let a = 100
    return function(){
        console.log(a)
    }
}
let fn = create()
let a = 200
fn()
```

A: 100

Q: 以下代码的执行结果(引用)
```
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

Q: 以下题目中的this指向哪里?
```
const children = {
    watching() {
        setTimeout(function(){
            console.log(this)
        })
    }
}

```

A: 

这里会打印出window,因为在setTimeout中，是一个普通函数的执行
如果想指向这个对象，可以把这个函数变为箭头函数

## 异步与同步

### 知识点
* 单线程和异步
* 应用场景
* callback hell 和 Promise

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

A: 主要的原因之一是因为回调地狱

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

Q: 前端使用异步的场景有哪些 (异步)

A:

* 网络请求，ajax图片加载
* 定时任务，setTimeout


Q: 以下如图所示程序的执行结果：
![](https://raw.githubusercontent.com/jerryjiao/imageUrl/master/WX20191120-225142@2x.png)

A: 1,3, 5, 4, 2

## JS-Web-API
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

const divList= document.querySelectorAll('div')  // 选择所有p元素。返回的是一个集合
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

## 事件绑定
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
## ajax
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

Q: cors是怎样实现跨域的？

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

Q: 简单实现一个Jsonp （TODO：看 面试之道小册）

A: 

## 存储
