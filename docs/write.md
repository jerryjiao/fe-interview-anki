# 前端基础知识艾宾浩斯记忆（手写代码）
Q: 手写防抖和节流
A: 
手写函数防抖和函数节流
防抖,debounce：如果下达命令后，在t毫秒内再次下达该命令，则取消刚刚下达的命令，只执行新命令
```
 function debounce(fn, wait) {
     let timer = null
     return function() {
         if(timer) 
             clearTimeout(timer)
         timer = setTimeout(() => fn.apply(this, arguments), wait)
     }
 }
```
 
节流(throttle)：从上一次命令结束开始的一定时间范围t内，如果多次连续下达命令，则只执行当前时间段t内第一次命令。

```
 function throttle(fn, gapTime) {
     let lastTime = null
     let nowTime = null
     return function() {
         nowTime = Date.now()
         if(!lastTime || nowTime - lastTime > gapTime) {
             fn()
             lastTime = nowTime
         }
     }
 }
```
 
Q: 不用 class 如何实现继承？用 class 又如何实现？

A: 
背代码，不用 class 这样实现
```
 function Animal(color){
     this.color = color
 }
 Animal.prototype.move = function(){} 
 function Dog(color, name){
     Animal.call(this, color) 
     this.name = name
 }
 // 下面三行实现 Dog.prototype.__proto__ = Animal.prototype
 function temp(){}
 temp.prototype = Animal.prototype
 Dog.prototype = new temp()

 Dog.prototype.constuctor = Dog // 这行看不懂就算了，面试官也不问
 Dog.prototype.say = function(){ console.log('汪')}

 var dog = new Dog('黄色','阿黄')
```
 
背代码，用 class 就简单了

```
 class Animal{
     constructor(color){
         this.color = color
     }
     move(){}
 }
 
 class Dog extends Animal{
     constructor(color, name){
         super(color)
         this.name = name
     }
     say(){}
 }
```
 
Q: 手写ajax
A: 
```
var request = new XMLHttpRequest()
 request.open('GET', '/a/b/c?name=ff', true)
 request.onload = ()=> console.log(request.responseText)
 request.send()
```

Q: 手写Promise
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
