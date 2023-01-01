// 发送JQ的ajax请求前都会先调用ajaxPrefilter函数
$.ajaxPrefilter(function(options){
    options.url = '根目录' + options.url


    // 统一为有权限的接口，设置headers请求头
    if(options.url.indexOf('/my/')!==-1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        }
})