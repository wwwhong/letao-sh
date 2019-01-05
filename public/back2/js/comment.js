/*公用js*/
$(function(){
    //1.进度条事件
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        NProgress.done();
    })
})
$(function(){

    //3.退出
    $(".lt_main .icon_logout").on("click",function(){
        //(1).显示模态框
        $("#myModal").modal("show");
    });
    //(2)退出 跳转到登录页
    $("#logoutBtn").on("click",function(){
        //发送ajax请问 让服务端把session 删除 退出 跳转到登录页
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                if(info.success){
                    location.href = "login.html";
                }
            }
        })
    });
})