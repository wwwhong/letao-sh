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
})