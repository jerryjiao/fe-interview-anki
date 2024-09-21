---
sidebar: auto
---
# Frontend Basics Anki

Welcome to the Frontend Basics Anki project. This site is designed to help you memorize and review frontend development concepts using the Ebbinghaus forgetting curve method.

## Contents

- [Frontend Basics](/): Basic knowledge of frontend development
- [Interview Questions](/real): Real interview questions
- [Coding Questions](/write): Hands-on coding exercises

## chapter01 Variables and Calculations
### Knowledge Points
* Variable Types
* Variable Calculations
* Truely and Falsely Variables

#### Variable Types

Q: What are the basic types?

A:

* Null
* Boolean
* Number
* String
* Undefined
* Symbol (ES6)

Q: What are the reference types?

A:

- Object
- Array
- Function
- Date
- RegExp (Regular Expression)


Q: What is the difference between primitive types and reference types?

A:

Most languages can be divided into two types:
value types and reference types, reference types are used to improve code execution efficiency

Value types are stored in `stack memory`. You can imagine the diagram below. Value types are immutable. That is, when copied to a new variable, the new variable changes, the old variable will not change.

![-w532](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/04/16/16185414439608.jpg)


Reference types are stored in `heap memory`. You can imagine the diagram below, which is somewhat like an address book. The stack only stores the memory address of the actual data, which is stored in that memory address. Reference types are mutable. That is, when copied to a new variable, the new variable changes, the old variable will also change.
![-w537](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/04/16/16185414566333.jpg)



Q: What types can `typeof` identify?

A:
Basic types, except for null, can be accurately identified. null will be identified as Object.
Reference types, only functions can be identified as such, others will be identified as Object.


#### Variable Calculations

Q: How to concatenate strings?

A:

You can use the `+` symbol

```js
const a = 10 + 10 // 20
const b = 10 + '10' // '1010'
const c = undefined + 10 //NaN
const d = undefined + '10' // 'undefined100'
```

Q: What is the difference between `==` and `===`?

A:

`==` will perform automatic type conversion

`===` will not perform automatic type conversion

It is recommended to use `===` in daily use

Q: What are falsely variables?

A:

Falsely variables are variables that become `false` after double negation

```js
!! NaN === false
```

If statements and logical operations are actually judging truely and falsely variables instead of directly judging `true` and `false`

For example:

```js
'' && '10' // ''
100 || NaN // 100
```

Q: How to distinguish truely and falsely variables

A:

The following are falsely variables:
*  0
*  NaN
*  ''
*  null
*  undefined
*  false

Others are truely variables

Q: What is the difference between deep copy and shallow copy?

A: 
The difference between deep copy and shallow copy mainly lies in reference types.
If it is deep copy, changing the copied variable will not affect the old variable.
Shallow copy only copies the address, changing the copied variable will also affect the old variable.

### Exercises

Q: Write a deep clone function

A:

```js
function deepClone(entry) {
    let result = null
    // step1: return if the input is a value type
    if(typeof entry !== 'object' || entry == null) {
        // the actual execution statement of the recursion
        return entry
    }
    // Step2: define the result type
    if(entry instanceof Array) {
        result = []
    } else {
        result = {}
    }

    // Step3:
    for(let key in entry) {
        // handle prototype
        if(entry.hasOwnProperty(key)){
            // recursion here
            result[key] = deepClone(entry[key])
        }
    }

    return result
}
```
## chapter02 Scope and Closure

### Knowledge Points

* Compilation Phase and Execution Phase
* Scope and Free Variables
* Closure
* this

#### Compilation Phase and Execution Phase

Q: What is the difference between the compilation phase and the execution phase?
js is an interpreted language, code execution has two phases, the compilation phase and the execution phase. Before the execution phase, the code will be pre-parsed to prepare for the execution of the code.
* Compilation Phase
Declaration Hoisting
Lexical Scope
Throw specific errors according to the specification
Generate the code needed at runtime.

* Execution Phase
Parse the code being used
Generate AST
Execution Context
Dynamic Scope
Throw all syntax errors
  

Q: What is declaration hoisting?

A: In the `compilation phase`, function declarations and variable declarations will be placed at the beginning. But only the declaration is placed at the beginning, the variable is not assigned, and the function is not executed. If the names are the same, the function declaration will override the variable declaration.

For example, the following code:
```
console.log( a )
var a = 1
function a(){}
console.log( a )
```
Can be equivalent to:
```
var a
function a(){}

console.log( a ) // function a(){}
a = 1
console.log( a ) // 1
```
#### Scope

Q: What is scope?

A:

It is the range of variables, as shown in the figure below

![](https://raw.githubusercontent.com/jerryjiao/imageUrl/master/1.png?token=ADBBE7CEZHFJFXGBTWBPWEK52VJIE)

The scope is determined during the code pre-parsing phase

Q: How many types of scope are there?

A:

* Global Scope
* Function Scope
* Block Scope (ES6, let, const)

Q: What is the Temporal Dead Zone?

A: 
Let and const declarations have a Temporal Dead Zone. In the current block scope, before assigning a value to a variable declared with let or const, you cannot access or operate on that variable, otherwise an error will occur. (Reference)


Q: What are free variables? How are their values determined? How to find them?

A:

* A variable that is not defined in the current scope but is used
* The value of free variables is determined when the function is defined (definitely at the time of definition, not at the time of execution)
* When a function is executed, it first looks for variables from itself
* If not found, it goes to the scope where the current function was created, and so on upwards
* If not found, it will report an error xx is not defined

#### Closure 

Q: What is a closure?

A:

If variables from the outside can be accessed inside a function, then this `function` + these `variables` = `closure`

The closure is determined during code parsing.

![-w453](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/04/16/16185414927693.jpg)


Q: Two scenarios of closure

A:

1. Function as a parameter

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

2. Function as a return value

    ```js
    function create() {
        let a = 100
        return function(){
            console.log(a)
        }
    }
    ```
    
#### this

Q: When is this determined?
A: The value of this is determined during the creation of the execution context.

Once this is clear, it is easy to know that the value of this is only determined when a function is called.

Q: How does this take value in different scenarios?

A:

The approach to solving this problem is to convert it into a .call function and see what the first parameter is. The first parameter is the object before the dot of the function that is actually executed. If there is none, it is Undefied, in strict mode it is undefined, and in non-strict mode it is window

```js
fn() {
    console.log(this)
}
is equivalent to fn.call(undefined) if it is undefined, then it is window
fn() // normal function, this is window
----------------------------------------------
obj = {
    fn: fn
}
obj.fn() // as an object method, this is the object
----------------------------------------------
const fn2 = fn.bind({a:1})
fn2()  // using bind/call/apply, this is the passed in {a:1}
----------------------------------------------
const b = ()=> {console.log(b)}

obj2 = {
    b:b
}
obj2.b()// the this of arrow functions inherits from the parent, this will print out window
----------------------------------------------
const c = new fn() // after new, this will be bound to the instance c
```

Q: What is the difference between call, bind, and apply?

A: 
 call, bind, and apply all bind the current scope's this
 The difference between bind, call, and apply is that the bind method returns a new function that binds the current this, but does not execute it, while call and apply execute the function.
 The difference between call and apply is that the parameters are passed in differently, call passes parameters one by one, while apply passes them in as an array

### Exercises

Q: What is the purpose of the bind method? Write a bind function

A:

The `bind()` method creates a new function, and when `bind()` is called, the `this` of the new function is specified by the first parameter, and the rest of the parameters will be used as parameters for the new function when it is called.

```js
// simulate bind
Function.prototype.bind1 = function() {
    // split the parameters into an array
    const args = Array.prototype.slice.call(arguments)

    // get this (first item in the array)
    const t = args.shift()

    // the fn1 in fn1.bind(...)
    const self = this

    // return a function
    return function () {
        return self.apply(t, args)
    }
}
```

Q: Real-world closure scenarios, give examples (reference)

A:

* Hide data
* Make a simple cache tool //TODO: what does this mean


Q: Create 10 `<a>` tags, and when clicked, pop up the corresponding object (reference)

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

Q: What is the execution result of the following code (reference)

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

Q: What is the execution result of the following code (reference)

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

Q: Where does this point in the following code?

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

This will print out `window`, because it is a normal function execution inside `setTimeout`.

If you want it to point to this object, you can change this function to an arrow function.

Q: What does this point to in the following function?
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
        // after 10ms, execute
        // fn.call(undefined), so output Window
    },
    fn2() {
        // execute arrow function after 20ms
        // there is no this in arrow functions, borrow this from the outside, which is app
    },
    fn3() {
        // create a new function, bind the outside this to it, which is app
        // execute the new function after 30ms, output this, which is the just bound app    
    }
    fn4: ()=> {
        // execute arrow function after 40ms
        // there is no this in arrow functions, borrow this from the outside
        // the outer fn4 is also an arrow function, so it doesn't have its own this, borrow the outside this, which is Window     
    }
}
```

## chapter03 Object-Oriented Programming
* Prototype and Prototype Chain
* new 
* Inheritance (Prototype and Class)

### Knowledge Points

#### Prototype

Q: What are the stages of new?

A: 
Create an empty object obj
Set the prototype chain, i.e., obj . _proto _ = constructor.prototype ;
Make the this in the constructor function point to obj
Return the object obj


Q: What is the purpose of instanceof?


A:

It is used to determine which class or constructor function an instance or constructor function belongs to, and can be used to determine arrays.

Class:

```js
class Variety {}
let variety = new Variety();

alert( variety instanceof Variety ); // true
```

Constructor Function:

```js
function Variety() {}

alert( new Variety() instanceof Variety ); // true
```

Q: Briefly introduce prototype

A:

* Each class has an **explicit** prototype prototype .
* Each instance has an **implicit** prototype `_proto_` .
* The `_proto_` of the instance points to the prototype of the corresponding class.

#### Prototype Chain

Q: Briefly describe the prototype and prototype chain execution rules


A:

1. If the instance has its own property, use it directly. If not, go to its implicit prototype chain to find,
keep going up to the top level Object, and return: `null` if not found.
2. Each constructor function has an explicit prototype, and each explicit prototype has a corresponding implicit prototype, and their parent's explicit prototype is one level up, and so on, until the first level (Object) is reached.
3. instanceof is used to determine if this instance or constructor function is inherited from the parent

#### Class

Q: How to construct a class

A:

* constructor
* properties
* methods

### Exercises

Q: How to determine the array type

A:

instanceof

Q: How to implement inheritance using class? (simple code implementation)

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

## chapter04 Asynchronous and Synchronous

### Knowledge Points
* Single-threaded and Asynchronous
* Application Scenarios
* Callback Hell and Promise
* async/await
* eventHub
* Macrotasks and Microtasks 

Q: What is the difference between synchronous and asynchronous?

A:

Synchronous will block the execution of subsequent programs,
while asynchronous will not block the execution of subsequent programs.

JS is single-threaded, it can only do one thing at a time, so JS needs asynchronous

Q: What is a callback function?

A:
A function passed as a parameter to another function and called within that function

For example:
```
function getImg(callback) {
    var imgUrl = 'xxxx'
    callback()
}
```

Q: What is callback hell? How to solve the problem of callback hell?

A: The main reason is because callback hell is nested due to code nesting, and the problem of callback hell can be solved using promises

For example:

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

Q: Basic syntax of Promise

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


Q: How many states does a Promise have?

A:
Three:

1.pending  // executing
2.resolve  // successful
3.reject   // rejected

Q: How does the Promise state change with then and catch?

A: 
* pending will not trigger any then or catch callbacks
* changing to resolved will trigger subsequent then callbacks
* changing to rejected will trigger subsequent catch callbacks

Q: What is a Promise chain?

A:
Promises can be chained, and the value returned in the then of one promise is the parameter of the next then
For example
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

Q: Please draw a simple diagram of the EventHub process?

A: 
1. console.log("Hi") is pushed into the call stack, the code is executed
2. The code is executed, "Hi" is printed to the console, the call stack is cleared
3. setTimeout is executed, setTimeout is defined by the browser, not part of ES6; the timer is placed in Web APIs, and the callback function is placed in the callback function queue after the time is up
4. After executing setTimeout, the call stack is cleared
5. console.log("Bye") enters the call stack, executes, and clears the call stack
6. After the synchronous code is executed, the callback stack is empty, and the browser kernel starts the event loop mechanism
7. After five seconds, the timer pushes cb1 into the callback function queue
8. The event loop puts cb1 into the call stack

![-w994](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/04/16/16185407397870.jpg)


Q: Basic usage of async/await?

A: 
1. async/await eliminates asynchronous callbacks and works with Promises.
2. Executing an async function returns a Promise object
3. await is equivalent to the then of a Promise
4. try...catch can catch exceptions, replacing Promise's catch

Q: What is the difference between macrotasks and microtasks? What are macrotasks and microtasks?

A: 

Microtasks: These are defined by ES, they are some asynchronous methods in JS code (Promise)
Macrotasks: These are methods defined by W3C, they are some asynchronous methods in the browser (setTimeout, ajax)

Because microtasks are executed before DOM rendering, and macrotasks are executed after DOM rendering, microtasks are executed first, then macrotasks.

Q: Solution approach for macrotask and microtask questions

A: 
1. Execute synchronous code first
2. Then execute microtask code (what follows await is a microtask)
3. Then execute macrotask code

Q: Execution steps of code

A: 
1. Synchronous code
2. Execute microtasks
3. (Try to trigger DOM rendering)
4. Trigger EventLoop, execute macrotasks

### Exercises


Q: Write a function to load an image using Promise (asynchronously)

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
                const err = new Error(`Image loading failed ${src}`)
                reject(err)
            }
            img.src=src
        }
    )
    return p
}
```

Q: Write a Promise

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