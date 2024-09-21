# Frontend Basic Knowledge Ebbinghaus Memory (Handwritten Code)

Q: Handwrite debounce and throttle functions
A:
Handwritten function debounce and function throttle
Debounce: If a command is issued again within t milliseconds after issuing a command, the previously issued command is canceled and only the new command is executed.
```javascript
function debounce(fn, wait) {
    let timer = null
    return function() {
        if(timer) 
            clearTimeout(timer)
        timer = setTimeout(() => fn.apply(this, arguments), wait)
    }
}
```

Throttle: Within a certain time range t starting from the end of the last command, if multiple consecutive commands are issued, only the first command within the current time period t is executed.

```javascript
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

Q: How to implement inheritance without using class? And how to implement it using class?

A:
Memorize the code, implement without using class like this:
```javascript
function Animal(color){
    this.color = color
}
Animal.prototype.move = function(){} 
function Dog(color, name){
    Animal.call(this, color) 
    this.name = name
}
// The following three lines implement Dog.prototype.__proto__ = Animal.prototype
function temp(){}
temp.prototype = Animal.prototype
Dog.prototype = new temp()

Dog.prototype.constructor = Dog // It's okay if you don't understand this line, interviewers don't ask about it
Dog.prototype.say = function(){ console.log('Woof')}

var dog = new Dog('yellow','Huang')
```

Memorize the code, it's simple using class:

```javascript
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

Q: Handwrite ajax
A:
```javascript
var request = new XMLHttpRequest()
request.open('GET', '/a/b/c?name=ff', true)
request.onload = ()=> console.log(request.responseText)
request.send()
```

Q: Handwrite Promise
A:
```javascript
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

Q: Write a general event listening function

A:
```javascript
function bindEvent(ele, type, selector, fn) {
    // If there are three parameters, the third parameter is fn
    if(fn == null) {
        fn = selector
        selector = null
    }

    ele.addEventListener(type, event => {
        const target = event.target
        if(selector) {
            // Delegate binding, use matched to match elements
            // Use call to bind this to target
            if(target.matches(selector)) {
                fn.call(target, event)
            }
        } else {
            fn.call(target, event)
        }
    })
}
```