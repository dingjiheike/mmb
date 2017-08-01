$(function(){
    // var id;
    $.ajax({
        url:'http://139.199.192.48:9090/api/getcoupon',
        success:function(data){
            var result = template('coupon_shops',data);
            $('main').append(result);
            console.log(data);
            // 为 a 标签 注册 点击 事件
            //  $('main').on('click','.coupon_made',function(){
            //       id=$(this).children('b').html();
        //          console.log(id);
        // $.ajax({
        //     url:'http://127.0.0.1/mmb_final/MMB-begin/data/coupon.php',
        //     type:'post',
            // 将id 发送 到后台 进行 存储
        //     data:'couponId='+id
        // })
    // })
        }
    })
})

   
