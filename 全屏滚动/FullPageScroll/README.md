# 全屏滚动

参考[全屏切换效果](http://www.imooc.com/learn/374)，介绍了封装了一个jQuery插件

效果：

![效果](https://github.com/windzencoder/Front/blob/master/images/fullpage_01.png)


## jQuery插件开发

参考：

+ [quexer/jQuery-plugin-authoring.md](https://gist.github.com/quexer/3619237)
+ [JQuery插件开发.md](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/JavaScript/JQuery%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91.md)
+ [jQuery插件开发精品教程，让你的jQuery提升一个台阶](http://www.cnblogs.com/Wayou/p/jquery_plugin_tutorial.html)

## 陌生的知识点

### 对this的理解

>this指的是，调用函数的那个对象

this-指当前处理的DOM元素

$this-通常由`var $this = $(this)`创建，

$(this)-元素的jQuery包装版本，可以访问其所有的方法

读this的立即可参考：

+ [this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
+ [Javascript的this用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)


### 一些jQuery方法

`data()` 方法向被选元素附加数据，或者从被选元素获取数据
```
$("#btn1").click(function(){
  $("div").data("greeting", "Hello World");
});
$("#btn2").click(function(){
  alert($("div").data("greeting"));
});
```

`$.type()` 函数用于确定JavaScript内置对象的类型，并返回小写形式的类型名称
```
$.type( undefined ) === "undefined"

$.type() === "undefined"

$.type( window.notDefined ) === "undefined"

$.type( null ) === "null"

$.type( true ) === "boolean"

$.type( 3 ) === "number"

$.type( "test" ) === "string"

$.type( function(){} ) === "function"

$.type( [] ) === "array"

$.type( new Date() ) === "date"

$.type( new Error() ) === "error" // jQuery 1.9 新增支持

$.type( /test/ ) === "regexp"
```

`index()` 方法返回指定元素相对于其他指定元素的 index 位置，如果未找到元素，`index()` 将返回 -1


`position()` 方法返回匹配元素相对于父元素的位置（偏移）,该方法返回的对象包含两个整型属性：`top` 和 `left`，以像素计
```
$(".btn1").click(function(){
  x=$("p").position();
  $("#span1").text(x.left);
  $("#span2").text(x.top);
});
```

`$(function() { ... });`等同于`$(document).ready(function() { ... });`
































