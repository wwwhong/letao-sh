/*一级分类*/
$(function(){
    //1.一进入页面 发送ajax请求 渲染页面
    var currentPage = 1;
    var pageSize = 5;
    render();

    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                console.log ( info )
                //3.准备数据 4.添加到页面
                var htmlStr = template("firstTpl",info);
                $("tbody").html(htmlStr);

                //分页初始化
                $("#paginator").bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage:info.page,
                    //总页数
                    totalPages:Math.ceil(info.total/info.size),
                    //注册页码点击事件
                    onPageClicked:function(a,b,c,page){
                        // 更新当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                })

            }
        });
    }

    //2.添加分类
    //2.1显示模态框
    $("#addBtn").on("click",function(){
        $("#addModal").modal("show");
    });

    //2.2进行表单校验
    $("#form").bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        // 校验字段, 一定要先配置 input 的 name
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    });
    // 2.3. 注册表单校验成功事件, 在成功准备提交表单时, 阻止默认的提交, 通过ajax提交
    $("#form").on("success.form.bv",function(e){
        e.preventDefault();//阻止默认表单事件

        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
                console.log ( info );
                if(info.success){
                    //添加成功,关闭模态框,重新渲染
                    $("#addModal").modal("hide");
                    render();

                    // 重置表单内容, 内容和状态都重置
                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }
        });
    });

});