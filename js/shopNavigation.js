$(function(){
    $.ajax({
        url:'http://139.199.192.48:9090/api/getsitenav',
        success:function(data){
            var result = template('shopList',data);
            $('.link_list').append(result);
        }
    })
})