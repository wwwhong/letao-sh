/*
** 二级分类
*/
$(function(){
    //1.一进入页面发送一次ajax请求, 渲染数据到页面
    var currentPage = 1;//当前页
    var pageSize = 5;   //每页显示的条数
    render();

    //发送ajax请求,渲染页面的封装函数
    function render(){
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            // dataType: "json",
            success:function(info){
                // console.log ( info );
                //3.准备数据 4.渲染到页面
                var htmlStr = template("secondTpl",info);
                $(".lt_content tbody").html(htmlStr);

                //设置分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//版本号
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    //完成事件
                    onPageClicked: function( a, b, c, page ) {
                        // 更新当前页
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                })
            }
        });
    };

    //2.添加分类按钮事件
    $("#addBtn").on("click",function(){
        // (1)显示模态框
        $("#addModal").modal("show");
        //(2)点击 发送请求,获取所有的一级分类,渲染下拉选框
        // 通过配置 page:1, pageSize:100 获取所有的以及分类
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                //3.准备数据,4渲染到页面
                $(".dropdown-menu").html(template("dropDownTpl",info));
            }
        });
    });
    //2.2 给所以的下拉菜单添加点击事件,通过事件委托的方式 给li注册点击事件
    $(".dropdown-menu").on("click","a",function(){
        //修改选中的文本
        var text = $(this).text();
        $(".dropdownText").text(text);
        //拿到categoryId
        var id = $(this).data("id");

        //选中的id设置到input表单元素中
        $('input[name="categoryId"]').val(id);

        //需要将校验状态置成 VALID 校验成功
        /* 参数1:字段
          参数2:校验状态
          参数3:配置规则,来配置我们的提示文本 */
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });

    // 2.3. 配置fileupload进行初始化
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            // console.log(data);
            //获取上传成功的图片地址,设置图片地址
            var pic = data.result.picAddr;
            $("#imgBox img").attr("src",pic);
            //将图片地址存在隐藏域中
            $('[name="brandLogo"]').val(pic);

            //重置校验状态
            $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    });

    // 2.4 配置表单校验
    $('#form').bootstrapValidator({

        // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            // 品牌名称
            brandName: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            // 一级分类的id
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            // 图片的地址
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    });

    //2.5注册校验成功实践,通过ajax进行添加
    $("#form").on("success.form.bv",function(e){
        //阻止默认的提交
        e.preventDefault();

        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$("#form").serialize(),
            success:function(info){
                //(1)提交成功,关闭模态框
                $("#addModal").modal("hide");
                //(2)重置表单里面的内容和校验状态
                $("#form").data("bootstrapValidator").resetForm(true);

                //(3)重新渲染第一页
                currentPage = 1;
                render();

                //(4)找到下拉菜单文本重置
                $("#dropdownText").text("请选择一级分类");

                //(5)找到图片重置
                $("#imgBox img").attr("src","images/none.png");
            }
        });
    });


});