$(function () {

    var couponTitle = getQueryString("title");
            document.querySelector('.couponTitle').innerHTML = couponTitle+'优惠券'
            ;


    var _id = getUrlParam('_id');

    $.ajax({
        url: 'http://139.199.192.48:9090/api/getcouponproduct',
        data: {
            "couponid": _id
        },
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            var result = template('couponProducts', data);
            $('.couponInfo_list').append(result);
            var swiper_slides = template('products_carousol_slide', data);
            $('.product_carousel').append(swiper_slides);
            //  列表中的a标签 注册 点击事件
            var index = 0;
            var clickCount = 0;
            var defaultIndex = 0;
            var liWidth = $('.product_carousel li:eq(0)').width();
            // 为列表 中的 的li标签 注册 事件
            $('.couponInfo_list').on('click', 'li', function () {
                index = $(this).index();
                $('.productImgs').addClass('show');
                 $('.product_carousel').css({
                     left:-liWidth * index + 'px'
                 });
                  defaultIndex = index;
                  clickCount = 0;
            })
            // 为 遮罩层 注册 事件
            $('.productImgs').click(function (event) {
                $(this).removeClass('show');
            })
            //为左边的 按钮注册事件
            $('.leftArrow').on('click', function (event) {
                if((clickCount+defaultIndex) ==  $('.product_carousel li').length-1) {
                    return;   
                }
                 clickCount++;
                $('.product_carousel').animate({
                    left: -liWidth * (clickCount+defaultIndex) + 'px'
                }, 500);
                event.stopPropagation();
            })
            //为右边的  按钮注册事件
            $('.rightArrow').on('click', function (event) {     
                if((clickCount+defaultIndex) == 0){
                    return;   
                }  
                clickCount--;     
                $('.product_carousel').animate({
                    left: -liWidth * (clickCount+defaultIndex) + 'px'
                }, 500);
                event.stopPropagation();
            })
        }
    })
})

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//  保证 从 url中 获取的内容 不乱码
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
       return decodeURI(r[2]);
    }else{
       return null;
    } 
 }