$(function () {


    // 导航数据加载
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getbaicaijiatitle',
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
            var result = template('navTemplate', data);
            $('.price-tabs ul.swiper-slide').html(result);

            // 写在回调函数里否则先执行无法达到效果
            var swiper = new Swiper('.swiper-container', {
                // scrollbar: '.swiper-scrollbar',
                // direction: 'vertical',
                slidesPerView: 'auto',
                // mousewheelControl: true,
                freeMode: true,
                roundLengths: true, //防止文字模糊
            });

            // 要写在template加载需要时间所以后面获取li要在他的回调函数里否则就找不到li标签
            // 导致不能注册事件
            $('.price-tabs ul.swiper-slide li').first().addClass('active');
            // 动画的索引
            var indexNow = 0;
            var $ul = $('.price-animate');
            // $ul.css({
            //     'transition': '.5s'
            // })

            // 点击导航项 加载各项数据
            $('.price-tabs ul.swiper-slide li').on('click', function () {
                // console.log('xxx');
                // 点击时获得类active
                $(this).addClass('active').siblings().removeClass('active');


                // 点击屏幕最后一个导航时向的动画


                var step = $ul.find('li').first().width();
                console.log($ul.offset().left);
                var ulLeft = $ul.offset().left;
                console.log($(this).index());

                if ($(this).index() > 2 && $(this).index() < 12 && indexNow < $(this).index()) {
                    indexNow = $(this).index();
                    console.log(indexNow);
                    if (ulLeft > 0) {
                        $ul.css({
                            // 'left':0,
                            'transform': 'translate3d(0px, 0px, 0px)'
                        })
                    } else if (ulLeft < -510) {
                        $ul.css({
                            // 'left':-510,
                            'transform': 'translate3d(-510px, 0px, 0px)'
                        })
                    } else {
                        $ul.css({
                            // 'left':(ulLeft-step)+'px'
                            'transform': 'translate3d(' + (ulLeft - step) + 'px, 0px, 0px)'
                        })
                    }

                } else if (indexNow > $(this).index() && $(this).index() > 1) {
                    indexNow = $(this).index();
                    if (ulLeft < -510) {
                        $ul.css({
                            // 'left':-510,
                            'transform': 'translate3d(-510px, 0px, 0px)'
                        })
                    } else if (ulLeft >= 0) {
                        $ul.css({
                            // 'left':0,
                            'transform': 'translate3d(0px, 0px, 0px)'
                        })
                    } else {
                        $ul.css({
                            // 'left':(ulLeft+step)+'px'
                            'transform': 'translate3d(' + (ulLeft + step) + 'px, 0px, 0px)'
                        })
                    }
                }


                // 点击时获取不同项目的传递数据的值
                titleId = $(this).index();
                $.ajax({
                    url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct',
                    data: {
                        titleid: $(this).index()
                    },
                    dataType: 'jsonp',
                    success: function (data) {
                        console.log(data);
                        var result = template('itemTemplate', data);
                        // console.log(result);
                        $('.price-list-tabs ul').html(result);
                    }
                })



                // 除了首页显示广告其他页面隐藏广告
                if ($(this).index() != 0) {
                    $('.price-ad').hide();
                } else {
                    $('.price-ad').show();
                }

            })


        }
    })


    // 点击搜索按钮弹出搜索框
    var flag = true;
    $('.searchbtn').click(function () {
        if (flag) {
            $('.searchbox').show();
            flag = false;
        } else {
            $('.searchbox').hide();
            flag = true;
        }
    })

    //导航 点击添加样式高亮
    console.log(document.querySelector('.price-tabs'));

    console.log(document.querySelector('.price-tabs ul.swiper-slide li'))


    //  页面刚刚加载时请求数据并加载 全部产品 项目
    getItemData();
    //    声明传递参数的 id 
    var titleId = 0;
    //  滚动到底部时加载新数据
    $(window).scroll(function () {
        //    console.log($(window).scrollTop());
        //     console.log($('body').height())
        // 滚动时加载新图片
        var scrollTop = $(window).scrollTop();
        var bodyHeight = $('.price-container').height() * 0.8;
        console.log(titleId);
        //  console.log(bodyHeight);
        //  console.log(scrollTop);
        if (scrollTop >= bodyHeight) {

            console.log(titleId);
            $.ajax({
                url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct',
                data: {
                    titleid: titleId
                },
                dataType: 'jsonp',
                success: function (data) {
                    console.log(data);
                    var result = template('itemTemplate', data);
                    // console.log(result);
                    $('.price-list-tabs ul').append(result);
                }
            })



        }


        //返回头部小箭头js  
        //  滚动时返回首页箭头出现；
        if (scrollTop >= 300) {
            $('.gotop').css('display', 'block');
        } else {
            $('.gotop').css('display', 'none');
        }
        leader = scrollTop;
    })
    // 点击返回小图标返回顶部
    var leader = 0,
        target = 0,
        timer = null;
    $('.gotop').click(function () {
        // $(window).scrollTop(0);
        target = 0;
        timer = setInterval(function () {
            leader = leader + (target - leader) / 10;
            window.scrollTo(0, leader);
            if (leader == target) {
                clearInterval(timer);
            }
        }, 10)
    })

    function getItemData() {

        $.ajax({
            url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct',
            data: {
                titleid: 0
            },
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
                var result = template('itemTemplate', data);
                // console.log(result);
                $('.price-list-tabs ul').append(result);
            }
        })
    }



})