/*进度条插件的使用*/
$(function(){
    /*了解NProgress 四个初始化事件
    * NProgress.start()  开始进度条
    * NProgress.set(0.4) 进度到40%
    * NProgress.inc()    进度条增长
    * NProgress.done()   结束进度条
    * */

    //添加进度条效果
    //1.在第一个ajax请求发送的时候,开启进度条
    //2.在所以ajax请求响应完成的时候,结束进度条

    /*需要借助ajax全局事件
    * .ajaxComplete(); 每个ajax请求完成后就会调用的回调函数 (不管请求成功还是失败)
    * .ajaxSuccess() ; 每个成功的ajax请求,后调用
    * .ajaxError()  ; 每个失败的ajax请求,都会调用
    * .ajaxSend()   ; 每个ajax请求发送时,就会触发
    *
    * .ajaxStart() ; 当第一个ajax请求发送时,会触发
    * .ajaxStop()   ; 最后一个ajax请求结束时触发
    * */

    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        NProgress.done();
    });
});

// 入口函数, 等待当前的 dom 结构, 加载完成后, 执行
$(function(){
    //公共的功能
    //1.左侧二级菜单切换
    $(".lt_aside .category").on("click",function(){
        $(this).next().stop().slideToggle();
    });

    //2.左侧栏切换功能
    $('.topBar .icon_menu').on('click',function(){
        $('.lt_aside').toggleClass('hid');
        $(".lt_main").toggleClass('hideMenu');
        $(".lt_main .topBar").toggleClass('hideMenu');
    });

    //3.退出功能
    // (1)显示模态框
    $('.lt_main .icon_logout').on('click',function(){
        $('#myModal').modal("show");
    });
    //(2)点击退出按钮,发送ajax请求,让后台删除sessionId
    $("#logoutBtn").on("click",function(){
        $.ajax({
            data:"get",
            url:"/employee/employeeLogout",
            dataType:'json',
            success:function(info){
                // console.log ( info );
                if(info.success ){//返回数据 success:true 成功 跳到首页
                    location.href="login.html";
                }
            }
        })
    })
});