// 首页的js

//点击更过 切换导航栏
$(function(){
  $('#gengduo').click(function(){
    if($('.switch').hasClass('none')){
      $('.switch').removeClass('none');
    }else{
       $('.switch').addClass('none');
    }
  })



})