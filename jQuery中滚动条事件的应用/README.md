# jQuery中滚动条事件的应用

本代码的来源自[jQuery 中滚动条事件的应用](http://www.jikexueyuan.com/course/2651.html)

## 页面返回顶部的两种方式

主要讲解了页面中常见的返回顶部的实现方法

## 判断滚动条方向做导航条动画

本例子是判断滚动条滚动方向，来显示和隐藏顶部的导航条。滚动条向下滑动时隐藏，向上滑动时显示。

主要代码如下：

        $(function () {

            var top1 = $(window).scrollTop();
            $('.nav').addClass('on');

            $(window).scroll(function () {

                var top2 = $(window).scrollTop();
                if(top2>top1){
                    //向下
                    $('.nav').removeClass('on');
                }else{
                    //向上
                    $('.nav').addClass('on');
                }
                top1 = top2;

            })
        })
        
效果如下：

![判断滚动条方向做导航条动画](https://github.com/windzencoder/Front/blob/master/jQuery%E4%B8%AD%E6%BB%9A%E5%8A%A8%E6%9D%A1%E4%BA%8B%E4%BB%B6%E7%9A%84%E5%BA%94%E7%94%A8/%E5%88%A4%E6%96%AD%E6%BB%9A%E5%8A%A8%E6%9D%A1%E6%96%B9%E5%90%91%E5%81%9A%E5%AF%BC%E8%88%AA%E6%9D%A1%E5%8A%A8%E7%94%BB/effect.gif)

## 根据滚动条位置逐次加载相应的内容

本例子主要讲的是，根据滚动条的位置，分别加载相应的内容，起到延迟显示内容的效果。

需要获取

1. 获取窗口的高度 `var win_h = $(window).height();`
2. 获取元素距离顶部的值 `var banner_h = $('.banner').offset().top;`
3. 获取匹配元素相对滚动条顶部的偏移。 `var top = $(window).scrollTop();`


代码如下：

            function addclass(e) {
                var win_h = $(window).height();
                var t = $(e).offset().top;
                var top = $(window).scrollTop();
                if(top>t-win_h*0.5){
                    $(e).addClass('on');
                }
            }
            
            $(window).scroll(function () {

                addclass('.banner');
                addclass('.con');

            })


效果如下：

![根据滚动条位置逐次加载相应的内容](https://github.com/windzencoder/Front/blob/master/jQuery%E4%B8%AD%E6%BB%9A%E5%8A%A8%E6%9D%A1%E4%BA%8B%E4%BB%B6%E7%9A%84%E5%BA%94%E7%94%A8/%E6%A0%B9%E6%8D%AE%E6%BB%9A%E5%8A%A8%E6%9D%A1%E4%BD%8D%E7%BD%AE%E9%80%90%E6%AC%A1%E5%8A%A0%E8%BD%BD%E7%9B%B8%E5%BA%94%E7%9A%84%E5%86%85%E5%AE%B9/effect.gif)

## 通过mCustomScrollbar自定义滚动条样式

使用`jquery.mCustomScrollbar.min.js`来自定义滚动条样式

![通过mCustomScrollbar自定义滚动条样式](https://github.com/windzencoder/Front/blob/master/jQuery%E4%B8%AD%E6%BB%9A%E5%8A%A8%E6%9D%A1%E4%BA%8B%E4%BB%B6%E7%9A%84%E5%BA%94%E7%94%A8/%20%E9%80%9A%E8%BF%87mCustomScrollbar%E8%87%AA%E5%AE%9A%E4%B9%89%E6%BB%9A%E5%8A%A8%E6%9D%A1%E6%A0%B7%E5%BC%8F/effect.png)




















