/**
 * Created by Miller on 16/10/19.
 */

$(function(){
    //$('.list li a[href="index.html"]').addClass('on');
    //获取href，index.html例如
    var index=window.location.href.split('/').length-1;
    var href=window.location.href.split('/')[index];

    if(href>0){
        $('.list li a[href="'+href+'"]').addClass('on');
    }else{//获取不到最后的地址
        $('.list li a[href^="index"]').addClass('on');
    }



})