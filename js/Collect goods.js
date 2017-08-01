window.onload = function() {
    setShopData("shop_option");
    setAreaData("area_option");
    setImgData("product_option");
    scroll();
}

// 获取数据并渲染
function setShopData(id){
    $.ajax({
        type:"get",
        url:"http://139.199.192.48:9090/api/getgsshop",
        data:{},
        success: function(result) {
            var html = template(id,result);
            $(".option>.shop_option").append(html);
        }
    });
}
function setAreaData(id){
    $.ajax({
        type:"get",
        url:"http://139.199.192.48:9090/api/getgsshoparea",
        data:{},
        success: function(result) {
            var html = template(id,result);
            $(".option>.area_option").append(html);
        }
    });
}
function setImgData(id,shopid,areaid){
    $.ajax({
        type:"get",
        data:{shopid:shopid||0,areaid:areaid||0},
        url:"http://139.199.192.48:9090/api/getgsproduct",
        success: function(result) {
            var html = template(id,result);
            $(".coudan_product>.section").html(html);
        }
    });
}

//实现下拉框
    var flag = true;
    var flag1="";
$(".coudan_filter>ul>a").on("click",function(){
    var $id=$(this).attr("data-target");
    if(flag1==$id){
        flag=false
    }else{
        flag=true;
    }
    flag1=$id;
    // console.log($id);
    var currentUl=$($id);
     if(flag){
        currentUl.show().siblings().hide(); 
        $(this).find(".caret").css({"transform":"rotate(180deg)"});
        $(this).siblings().find(".caret")
        .css({"transform":"rotate(0deg)"});
        flag = false;
    }else{
        currentUl.hide();
        $(".coudan_filter>ul").find(".caret").css({"transform":"rotate(0deg)"});
        flag=true;
        flag1="";
    }
});

// 下拉中的选择
setTimeout(function(){
    $(".option>ul>li").on("click", function () {
        $(this).parent().find("span")
            .removeClass("font-icon font-icon-zhengque");
        $(this).find("span").addClass("font-icon font-icon-zhengque");
        // 收回ul下拉框
        $(this).parent().hide();
        $(".coudan_filter .caret").css({"transform":"rotate(0deg)"});
        // 获取对应的link
        var currentLink = $("."+$(this).attr("mark"));
        // 获取此时点击的地区
        var area = /[\u4e00-\u9fa5]+/.exec($(this).text())[0];
        $(currentLink).find("i").text(area);
        if($(this).attr("mark")=="shop"){
            shopid = $(this).attr("name");
        }else if($(this).attr("mark")=="area"){
            areaid = $(this).attr("name");
        }
    });
},500);

// 滚动触底刷新页面
function scroll(){
    var clientHeight = $(window).height();// 浏览器可视区高度
    var index = 0;
    var isRequestEnd = true;// 添加节流阀
    $(window).on("scroll", function () {
        if(!isRequestEnd) return;
        var pageHeight = $(".coudan_product").height();// 页面高度
        var scrollHeight = document.body.scrollTop;
        if(pageHeight-scrollHeight<=clientHeight+200) {
            index++;
            if(index==4){index=0}
            isRequestEnd = false;
            setImgDataAppend("product_option",index,function(){
                isRequestEnd = true;
            });
        }
    });

}

//实现三个一起转换
function setImgDataAppend(id,shopid,callback){
    $.ajax({
        type:"get",
        data:{shopid:shopid||0,areaid:0},
        url:"http://139.199.192.48:9090/api/getgsproduct",
        success: function(result) {
            var html = template(id,result);
            $(".coudan_product>.section").append(html);
            callback && callback();
        }
    });
}
 