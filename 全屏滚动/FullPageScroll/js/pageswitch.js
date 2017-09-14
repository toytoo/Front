(function($){


    /*说明:获取浏览器前缀*/
    /*实现：判断某个元素的css样式中是否存在transition属性*/
    /*参数：dom元素*/
    /*返回值：boolean，有则返回浏览器样式前缀，否则返回false*/
    var _prefix = (function(temp){
        var aPrefix = ["webkit", "Moz", "o", "ms"],
            props = "";
        for(var i in aPrefix){
            props = aPrefix[i] + "Transition";
            if(temp.style[ props ] !== undefined){
                return "-"+aPrefix[i].toLowerCase()+"-";
            }
        }
        return false;
    })(document.createElement(PageSwitch));

    var PageSwitch = (function(){
        function PageSwitch(element, options)
        {
            //将用户自定义的插件参数与插件默认的参数加以合并
            this.settings = $.extend(true,$.fn.PageSwitch.defaults, options || {});
            this.element = element;
            //不要漏掉
            this.init();
        }
        PageSwitch.prototype = {
            /*说明：初始化插件*/
            /*实现：初始化dom结构，布局，分页及绑定事件*/
            init : function(){
                var me = this;

                me.selectors = me.settings.selectors;
                me.sections = me.element.find(me.selectors.sections);
                me.section = me.sections.find(me.selectors.section);
                //滚动方向
                me.direction = me.settings.direction == "vertical" ? true : false;
                //page的数量
                me.pagesCount = me.pagesCount();
                me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;

                me.canscroll = true;

                if(!me.direction|| me.index)
                {
                    //横屏滚动布局
                    me._initLayout();
                }

                //分页
                if(me.settings.pagination)
                {
                    me._initPaging();
                }

                //初始化事件
                me._initEvent();
            },
            /*说明：获取滑动页面数量*/
            pagesCount : function(){
                return this.section.length;
            },
            /*说明：获取滑动的宽度（横屏滑动）或高度（竖屏滑动）*/
            switchLength : function(){
                return this.direction ? this.element.height() : this.element.width();
            },
            /*说明：向前滑动即上一页*/
            prve : function(){
                var me = this;
                if(me.index > 0){
                    me.index --;
                }else if(me.settings.loop){
                    me.index = me.pagesCount - 1;
                }
                me._scrollPage();
            },
            /*说明：向后滑动即下一页*/
            next : function(){
                var me = this;
                if(me.index < me.pagesCount){
                    me.index ++;
                }else if(me.settings.loop){
                    me.index = 0;
                }
                me._scrollPage();
            },
            /*说明：主要针对横屏情况进行页面布局*/
            /*有下滑线表示私有方法*/
            _initLayout : function(){
                var me = this;
                if(!me.direction){
                    //总宽度
                    var width = (me.pagesCount * 100) + "%";
                    //每个cell的宽度，保留2位小数
                    var cellWidth = (100/me.pagesCount).toFixed(2) + "%";
                    me.sections.width(width);
                    me.section.width(cellWidth).css("float", "left");
                }
                if(me.index){
                    me._scrollPage(true);
                }

            },
            /*说明：主要针对横屏情况进行页面布局*/
            _initPaging : function(){
                var me = this,
                    pagesClass = me.selectors.page.substring(1);
                me.activeClass = me.selectors.active.substring(1);

                var pageHtml = "<ul class="+pagesClass+">";
                for(var i = 0 ; i < me.pagesCount; i++){
                    pageHtml += "<li></li>";
                }
                pageHtml += "</ul>";
                me.element.append(pageHtml);

                var pages = me.element.find(me.selectors.page);
                //以后要用，所以保存
                me.pageItem = pages.find("li");
                me.pageItem.eq(me.index).addClass(me.activeClass);


                if(me.direction){
                    //竖向显示
                    pages.addClass("vertical");
                }else{
                    //横向显示
                    pages.addClass("horizontal");
                }
            },
            /*说明：初始化插件事件*/
            //1.点击分页滑动
            //2.鼠标滚轮滑动时间
            //3.键盘事件
            //4.窗口的resize事件
            _initEvent : function(){

                var me = this;

                /*绑定分页click事件*/
                me.element.on("click", me.selectors.page + " li", function(){
                    //ndex() 方法返回指定元素相对于其他指定元素的 index 位置
                    me.index = $(this).index();
                    me._scrollPage();
                });

                /*绑定鼠标滚轮事件*/
                me.element.on("mousewheel DOMMouseScroll", function(e){
                    e.preventDefault();
                    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                    if(me.canscroll){
                        if(delta > 0 && (me.index && !me.settings.loop || me.settings.loop)){
                            me.prve();
                        }else if(delta < 0 && (me.index < (me.pagesCount-1) && !me.settings.loop || me.settings.loop)){
                            me.next();
                        }
                    }
                });

                /*键盘事件*/
                if(me.settings.keyboard){
                    $(window).keydown(function(e){
                        var keyCode = e.keyCode;
                        if(keyCode == 37 || keyCode == 38){
                            me.prve();
                        }else if(keyCode == 39 || keyCode == 40){
                            me.next();
                        }
                    });
                }

                /*绑定窗口改变事件*/
                /*为了不频繁调用resize的回调方法，做了延迟*/
                var resizeId;
                $(window).resize(function(){
                    clearTimeout(resizeId);
                    resizeId = setTimeout(function(){
                        var currentLength = me.switchLength();
                        var offset = me.settings.direction ? me.section.eq(me.index).offset().top : me.section.eq(me.index).offset().left;
                        if(Math.abs(offset) > currentLength/2 && me.index < (me.pagesCount - 1)){
                            me.index ++;
                        }
                        if(me.index){
                            me._scrollPage();
                        }
                    },500);
                });



                /*支持CSS3动画的浏览器，绑定transitionend事件(即在动画结束后调用起回调函数)*/
                if(_prefix){
                    me.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function(){
                        //执行动画结束时，设置为true
                        me.canscroll = true;
                        //回调
                        if(me.settings.callback && $.type(me.settings.callback) === "function"){
                            me.settings.callback();
                        }
                    })
                }

            },
            /*滑动动画*/
            _scrollPage : function(init){
                var me = this;
                var dest = me.section.eq(me.index).position();
                if(!dest) return;

                //防止一下子滚动多屏
                me.canscroll = false;
                if(_prefix){//支持transition
                    var translate = me.direction ? "translateY(-"+dest.top+"px)" : "translateX(-"+dest.left+"px)";
                    me.sections.css(_prefix+"transition", "all " + me.settings.duration + "ms " + me.settings.easing);
                    me.sections.css(_prefix+"transform" , translate);
                }else{//不支持transition
                    var animateCss = me.direction ? {top : -dest.top} : {left : -dest.left};
                    me.sections.animate(animateCss, me.settings.duration, function(){
                        me.canscroll = true;
                        if(me.settings.callback){
                            me.settings.callback();
                        }
                    });
                }
                //分页
                if(me.settings.pagination && !init){
                    me.pageItem.eq(me.index).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
                }
            }
        };
        return PageSwitch;
    })();

    $.fn.PageSwitch = function(options)
    {
        return this.each(function(){
            //这里是单例
            //data() 方法向被选元素附加数据，或者从被选元素获取数据。
            var me = $(this), instance = me.data("PageSwitch");
            if(!instance) {
                instance = new PageSwitch(me, options);
                me.data("PageSwitch", instance);
            }

            //如果传递的参数是字符串
            if($.type(options) === "string")
            {
                return instance[options]();
            }

        });
    };
    //默认参数
    $.fn.PageSwitch.defaults = {
        selectors:{
            sections: ".sections",
            section: ".section",
            page: ".pages",
            active: ".active"
        },
        index: 0,//页面开始的索引
        easing: "ease",//动画效果
        duration: 500,//动画执行时间
        loop: false,//是否循环切换
        pagination: true,//是否进行分页
        keyboard: true,//是否触发键盘事件
        direction: "vertical",//滑动方向vertical,horizontal
        callback: ""//回调函数
    }

    $(function(){
        $('[data-PageSwitch]').PageSwitch();
    });

})(jQuery);
