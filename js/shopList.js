$(function () {
      // 商品标题id
      var categoryId = getRequest().index;
      //商品的标题
      var cateGory = getRequest().name;
      // 第一页
      var currentPage = 1;
      // 总页面
      var pageNum = 1;
      // 商品id
      var productId;
      //定义三级菜单的名称
      var brandName;
      // 商品的单价
      var productMoney;
      // 商品的评论数
      var productComment;
      // 一出来就要渲染一次页面
      getDate(currentPage);
      //给下一页注册点击事件
      $('.page-right').click(function () {
            $('.shop-black').show();
            if (currentPage >= pageNum) {
                  $('.shop-black').fadeOut();
                  return;
            }
            currentPage++;
            //测试
            // console.log(currentPage);
            getDate(currentPage);
      });
      //给上一页注册点击事件
      $('.page-left').click(function () {
            $('.shop-black').show();
            if (currentPage == 1) {
                  $('.shop-black').fadeOut();
                  return;
            }
            currentPage--;
            // 测试
            // console.log(currentPage);
            getDate(currentPage);
      });
      // 给每一个商品注册点击事件
      $('.shop-all').on('click', '.shop-list', function () {
            $('.shop-black').show();
            var $this = $(this);
            if ($('.shopping').hasClass('none')) {
                  $('.shopping').removeClass('none');
                  $('.shop-content').addClass('none');
            } else {
                  $('.shopping').addClass('none');
                  $('.shop-content').removeClass('none');
            }
            $.ajax({
                  url: 'http://139.199.192.48:9090/api/getproductlist',
                  data: {
                        categoryid: categoryId,
                        pageid: currentPage
                  },
                  success: function (data) {
                        //获取id
                        productId = $this.attr('index');
                        // 获取单价
                        productMoney = $this.attr('money');
                        // 获取评论数
                        productComment = $this.attr('comment');
                        // 测试
                        console.log($this.attr('brandName'));
                        // 商品详情数据(上)
                        $.ajax({
                              url: 'http://139.199.192.48:9090/api/getproduct',
                              data: {
                                    productid: productId
                              },
                              success: function (data) {
                                    var shopTop = template('shopTop',
                                          data.result[0]);
                                    //测试
                                    // console.log(result);
                                    $('.shop-content-top').html(
                                          shopTop);
                                    $(
                                                '.shop-content-top .text-bottom p'
                                          ).first().html('当前最低 : ' +
                                                productMoney).end()
                                          .last().html('优选评论 : ' +
                                                productComment + '条');
                                    //给动态生成的购买区域添加样式
                                    $('.shop-content-top table').addClass(
                                          'dongBuy');
                                    $('.shop-content-top .pic2').click(function () {
                                          if (confirm('你确定要收藏嘛？')) {
                                                alert('收藏成功');
                                          } else {
                                                alert('希望您能挑选到满意的商品! O(∩_∩)O');
                                                return;
                                          }
                                    });
                              }
                        });
                        // 商品详情数据(下)
                        $.ajax({
                              url: 'http://139.199.192.48:9090/api/getproductcom',
                              data: {
                                    productid: productId
                              },
                              success: function (data) {
                                    var shopComment = template(
                                          'shopComment', data);
                                    $('.shop-content-comment').html(
                                          shopComment);
                                    $('.shop-black').fadeOut();
                              }
                        });
                  }
            });
      });
      // 给3级菜单注册单击事件
      $('.shop-three a').eq(2).click(function () {
            $('.shop-black').show().fadeOut();
            if ($('.shopping').hasClass('none')) {
                  $('.shopping').removeClass('none');
                  $('.shop-content').addClass('none');
            } else {
                  $('.shopping').addClass('none');
                  $('.shop-content').removeClass('none');
            }
      })
      // 给商品标题注册单击事件
      $('#shop-top a').click(function () {
            $('.shop-black').show();

            $(this).parent().siblings().children().removeClass('mmbRed').end().end().children().addClass(
                  'mmbRed');
            getDate(currentPage);
      });
      // 获取商品列表的数据
      function getDate(currentPage) {
            //定义调用者的this，方便运用
            var $this = $(this);
            $.ajax({
                  url: 'http://139.199.192.48:9090/api/getproductlist',
                  data: {
                        categoryid: categoryId,
                        pageid: currentPage
                  },
                  success: function (data) {
                        //获取总页数并渲染
                        pageNum = Math.ceil(data.totalCount / data.pagesize);
                        $('.shop-bottom .page-center span').eq(1).html(pageNum);
                        //当前页面
                        $('.shop-bottom .page-center span').first().html(currentPage);
                        // 获取商品列表的数据并放入页面
                        var result = template('shopList', data);
                        $('.shop-all').html(result);
                        // 拿到数据就撤掉遮罩层
                        $('.shop-black').fadeOut();
                        //获取当前页面物品的id
                        for (var i = 0; i < data.pagesize; i++) {
                              //将每个对应的id放入每个对应的商品中
                              $($('.shop-list')[i]).attr('index', data.result[i].productId);
                              // 设置商品价格
                              $($('.shop-list')[i]).attr('money', data.result[i].productPrice);
                              //设置商品评论数
                              $($('.shop-list')[i]).attr('comment', data.result[i].productCom.match(
                                    /\d+/));
                              // 测试
                              // console.log($($('.shop-list')[i]));
                        }
                        // 如果当前页数等于最后一页就禁用，否则启用
                        if (currentPage == pageNum) {
                              $('.page-right').prop('disabled', true);
                        } else {
                              $('.page-right').prop('disabled', false);
                        }
                        // 如果当前页数等于最后一页就禁用，否则启用
                        if (currentPage == 1) {
                              $('.page-left').prop('disabled', true);
                        } else {
                              $('.page-left').prop('disabled', false);
                        }

                  }
            });
      }
      //底部链接名以及三级菜单名
      // $('.shop-bottom .link a').eq(1).html(cateGory + "十大品牌");
      $('.shop-bottom .link a').eq(1).html("热门品牌大全");
      // $('.shop-bottom .link a').eq(2).html(cateGory + "口碑大全");
      $('.shop-three p a').eq(2).append(cateGory);
      console.log($('.shop-content-top .pic2'));

      //封装获取url中的键值对的函数
      function getRequest() {
            var url = window.location.search; //获取url中"?"符后的字串   
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                  var str = url.substr(1);
                  strs = str.split("&");
                  for (var i = 0; i < strs.length; i++) {
                        //就是这句的问题
                        theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                        //之前用了unescape()
                        //才会出现乱码  
                  }
            }
            return theRequest;
      }
});