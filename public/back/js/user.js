/*
** Create by whong on 2019/1/5
*/
//用户信息页
$(function(){
    //发送ajax获取user信息,使用template模板渲染到页面上
    var currentId; //当前操作的用户id
    var isDelete; //当前需要修改用户的状态

    var currentPage = 1; //声明当前页
    var pageSize = 5; //没有显示的条数

    //一进入页面就要发送一次ajax 请求数据
    render();
    //1.html页面引入模板 2.准备模板 3.准备数据 4.渲染模板
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                console.log ( info );
                //3.准备数据 4.渲染到页面
                var htmlStr = template("tpl",info);
                $("tbody").html(htmlStr);

                // 分页初始化
                $("#paginator").bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage:info.page,
                    //总页数
                    totalPages:Math.ceil(info.total/pageSize),
                    //为按钮绑定点击事件 page:当前点击的按钮值
                    onPageClicked:function(a,b,c,page){
                        //更新到page 页
                        currentPage = page;
                        //重新渲染页面
                        render();
                    }
                });
            }
        });
    }

    //2.1按钮事件, 通过事件委托绑定 (弹出模态框)
    $("tbody").on("click",".btn",function(){
        //(1)弹出模态框
        $("#myModal").modal("show");
        //(2)获取当前用户的ID
        currentId = $(this).parent().data("id");
        //(3)判断用户的状态 通过 是否有禁用的按钮红色背景的 类  如果有 是禁用 没有 是启用状态
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    });
    //2.2弹出的模态框的 确认 按钮点击事件
    $("#userOutBtn").on("click",function(){
        //发送ajax请求
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id:currentId ,
                isDelete: isDelete
            },
            dataType:"json",
            success:function(info){
                // console.log ( info );
                if(info.success){
                    // (1)关闭模态框
                    $("#myModal").modal("hide");
                    //(2)重新渲染数据
                    render();
                }
            }
        });
    })



});