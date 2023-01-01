$(function(){
    getUserInfo()

    // 点击'退出'按钮，实现退出功能
    var layer = layui.layer
    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/login.html'
            // 关闭确认框
            layer.close(index);
          });
    })
})


// 获取用户基本信息
function getUserInfo(){
    $.ajax({
        url:'http://www.liulongbin.top:3007/my/userinfo',
        method:'GET',
        // headers请求头配置对象
        
        headers: {
            Authorization:localStorage.getItem('token') || ''

        },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
            
        },
        complete:function(res){

            // 根据返回信息判断身份验证是否失败
            if(res.responseJSON.status === 1 ){
                console.log('判断')
                // 1.强制清空token
                localStorage.removeItem('token')
                setTimeout("layui.layer.msg('请先登录!')",500)
                
                // 2.强制跳转到登录页面
                setTimeout("location.href = '/login.html'",1000)
                
                
            }
        }

        
    })
}


// 渲染用户的头像
function renderAvatar(user){
    // 1.获取用户名称 
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎:'+name)
    // 3.按需渲染图片头像
    if(user.user_pic!==null){
        // 3.1渲染图片头像
         $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.txt-avatar').html(first).show()
    }
   
}