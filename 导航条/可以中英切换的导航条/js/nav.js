
$(function () {

    $('.list li a').hover(function () {
        //移入
        $(this).stop().animate({"margin-top":-40}, 300);
    }, function () {
        //移出
        $(this).stop().animate({"margin-top":0}, 300);
    })

})