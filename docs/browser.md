# 浏览器

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
*![-w1061](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16187545994946.jpg)
![-w1136](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16187546318661.jpg)
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
![-w805](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16187553136578.jpg)
![-w943](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16187553286229.jpg)

Q: 什么是协商缓存？

A:
![-w811](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16187553725858.jpg)
![-w792](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16187553878050.jpg)
![-w966](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16187554064070.jpg)
![-w858](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16187554213995.jpg)
![-w757](https://jerryblog-1254426031.cos.ap-nanjing.myqcloud.com/2021/08/16/16187554478877.jpg)




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
