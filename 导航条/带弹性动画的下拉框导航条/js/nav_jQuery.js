/**
 * Created by Miller on 16/10/20.
 */

$(function(){

    $('.list li').hover(function () {
        $(this).find('.down').stop().slideDown()
    }, function () {
        $(this).find('.down').stop().slideUp()
    })

})