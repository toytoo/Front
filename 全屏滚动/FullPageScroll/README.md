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

对this的立即可参考：

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


## fullPage.js

使用[fullPage.js](https://github.com/alvarotrigo/fullPage.js/)插件来实现全屏滚动的效果，教程参考[FullPage.js全屏滚动插件](http://www.imooc.com/learn/514)

配置参数的含义：

+ sectionsColor-为每个section设置背景色
+ controlArrows-是否通过箭头来控制slide幻灯片，默认为true
+ verticalCentered-每一页的内容是否垂直居中，默认为true
+ resize-字体是否随着窗口缩放而缩放，默认为fasle
+ scrollingSpeed-设置滚动的速度，单位为毫秒，默认为700 
+ anchors-定义锚链接，默认为[]。有了锚链接，用户就可以快速打开定位到某一页面。注意定义锚链接的时候，值不要和页面的id或name相同，尤其是在IE浏览器下。而且定义的时候不要添加#。添加后滚动到某一个页面，浏览器会地址类似于`http://localhost:63342/FullPage/setting_01.html#page3`
+ lockAnchors-是否锁定锚链接，默认为false。如果设置为true，那么定义的锚链接，也就是anchors则没有效果。这个配置项很少使用
+ easing-定义页面section滚动的动画方式。默认为easeInOutCubic，如果修改此项，需要引入jquery.easings插件，或者jquery ui
+ css3-是否使用CSS3 transforms来实现滚动效果，默认为true。这个配置项可以提高支持css3的浏览器，比如移动设备等速度，如果浏览器不支持css3，则会使用jquery来代替css3实现滚动效果
+ loopTop-滚动到最顶部后是否连续滚动到底部，默认为false
+ loopBottom-滚动到最底部后是否连续滚动回顶部，默认为false
+ loopHorizontal-横向slider幻灯片是否循环滚动，默认为true
+ autoScrolling-是否使用插件的滚动方式，默认true，如果选择false，则会出现浏览器自带的滚动条，将不会按页滚动，而是按照滚动条默认行为来滚动
+ scrollBar-是否包含滚动条，默认为false，如果设置为true，则浏览器自带的滚动条出现，页面滚动时还是按页滚动，但是滚动条的默认行为也有效
+ paddingTop/paddingBottom-设置每一个section顶部和底部的padding，默认为0。一般如果要设置一个固定在顶部或者底部的菜单、导航、元素等，可以使用这两个配置
+ fixedElements-固定的元素，默认为null，需要配置一个jquery选择器。在页面滚动的时候，fixedElements设置的元素固定不动
+ keyboardScrolling-是否可以使用键盘方向键导航，默认为true
+ touchSensitivity-在移动设备中滑动页面的敏感性，默认为5，是按百分比来衡量，最高为100，越大则越难滑动
+ continuousVertical-是否循环滚动，默认为false。如果设置为true，则页面会循环滚动，而不像loopTop或loopBottom那样出现跳动，注意这个属性和loopTop、loopBottom不兼容，不要同时设置
+ animateAnchor-锚链接是否可以控制滚动页面，默认为true。如果设置为false，则通过锚链接定位到某个页面显示不再有动画效果
+ recordHistory-






























