$(function () {

    var ids = getUrlParam("productid")
    // console.log(ids)
    $.ajax({
        url: "http://139.199.192.48:9090/api/getdiscountproduct?productid="+ids,
        success:function(data){
            //   console.log(data)
            var  aa =  template("details-template",data)
            // console.log(aa)
            document.querySelector(".details-nows").innerHTML=aa
        }
    })
})