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
就是变量作用的范围，如图所示即为作用域

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
dom的本质是一颗树
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

Q； attr和property的区别
#### BOM

## 事件绑定

## ajax

## 存储

### 题目

Q：一次性插入多个DOM节点，考虑性能

A:
