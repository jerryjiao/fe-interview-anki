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

### class继承

Q: 如何构建一个Class

A: 

### 原型链

### 题目

Q: 如何判断数组类型

A: instanceOf
