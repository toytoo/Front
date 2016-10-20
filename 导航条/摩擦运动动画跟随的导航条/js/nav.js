$(function(){
	//地址的最后一个 例如index.html
	var index=window.location.href.split('/').length-1;
	var href=window.location.href.split('/')[index].substr(0,4);
	//添加类
	$(".nav_con li a[href^='"+href+"']").addClass("on");
	
	//宽度
	var li_width=$(".nav_con li a.on").outerWidth();
	//左边的偏移
	var li_left=$(".nav_con li a.on").position().left;	
	$(".nav_con .line").css({width:li_width,left:li_left})
	

	$(".nav_con li").hover(function(){
		//移入
		var li_width=$(this).outerWidth();
		var li_left=$(this).position().left;
		$(".nav_con .line").stop().animate({width:li_width,left:li_left},{duration:1500,easing:"easeOutElastic"})
		
		
		
	},function(){
		//移出
		$(".nav_con .line").stop().animate({width:li_width,left:li_left},{duration:1500,easing:"easeOutElastic"})
		
	})
	
})