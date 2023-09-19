# Dom和Bom

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