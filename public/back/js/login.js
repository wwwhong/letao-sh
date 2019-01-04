$(function(){
    //进行表单校验初始化
    $('#form').bootstrapValidator({
        //配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', //校验成功
            invalid: 'glyphicon glyphicon-remove', //校验失败
            validating: 'glyphicon glyphicon-refresh' //校验中
        },
        //配置校验字段 注意:先给input 配置 name
        fields:{
            username:{
                //校验规则
                validators:{
                    //非空校验
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    //长度校验
                    stringLength:{
                        min:2,
                        max:6,
                        message:"用户名长度必须是2-6位"
                    },
                    //callback 专门用于提示的
                    callback:{
                        message:"用户名错误"
                    }
                }
            },
            password:{
                //校验规则
                validators:{
                    //非空校验
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度必须是6-12位"
                    },
                    //callback 专门用于提示的
                    callback:{
                        message:"密码错误"
                    }
                }
            }
        }
    });

    //2.需要用到插件的校验功能,所以要用submit按钮
    //需要注册表单校验成功实践,在事件中,阻止默认的提交,防止跳转,通过ajax提交即可

    //注册表单校验成功事件
    $("#form").on('success.form.bv', function (e){
        //阻止默认的提交
        e.preventDefault();

        //通过ajax提交
        // console.log ( "通过ajax提交,阻止了默认的提交" );

        $.ajax({
            type:"post",
            url: "/employee/employeeLogin",
            data:$('#form').serialize(),
            dataType:"json",
            success:function(info){
                console.log ( info );
                if(info.error === 1000){
                    // alert("用户名不存在");
                    //调用插件实例方法,更新校验状态程失败,提示用户不存在
                    //参数1:字段 参数2:校验状态 参数3:校验规则
                    $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
                    return;
                }
                if(info.error === 1001){
                    // alert("密码错误");
                    $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
                    return;
                }
                if(info.success){
                    location.href = "index.html";
                }
            }
        })


    })

    //3.重置功能
    //默认type = "reset" 按钮,只重置了表单内容,此时需要调用我们的插件方法,重置状态和养样式
    // $("#form").data("bootstrapValidator") 创建插件实例
    // resetForm(); 不传参 ,只重置状态
    //resetForm(true); 传true,内容和状态都重置
    $('[type="reset"]').click(function(){
        $('#form').data("bootstrapValidator").resetForm();//只重置状态,内容已经被reset按钮重置了
    })
})