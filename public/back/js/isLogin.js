/*做登录拦截*/
/* 需求: 登陆拦截, 如果当前用户未登录, 拦截到登陆页
 *  由于前端不知道用户的登录状态, 但是后端知道, 所以发送请求询问即可
 * */
$(function(){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType:"json",
        success:function(info){
            if(info.error === 400){
                //未登录,跳转到登录页面
                location.href = "login.html";
            }
            if(info.success){
                console.log ( "当前用户已登录" );
            }
        }
    })
})