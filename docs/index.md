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
   4. 复制引用类型，新的值改变对老值也会跟着改变

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

#### 作用域和自由变量
Q: 什么是作用域?

A: 
就是变量作用的范围，如图所示即为作用域
![](https://raw.githubusercontent.com/jerryjiao/imageUrl/master/WX20191113-224427%402x.png?token=ADBBE7BMFMKEAG4AMFFORIC5ZQNV4)

Q: 作用域分几种类型？

A:
全局作用域
函数作用域
块级作用域(es6)

### 题目

Q: this的不同场景，怎么取值？

Q: 手写bind函数

Q: 实际开发中的闭包场景，举例说明

Q: 创建10个`<a>`标签，点击的时候弹出对应的对象
