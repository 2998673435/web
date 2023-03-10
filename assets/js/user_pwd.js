$(function(){
    var form = layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){return '新密码不能和原密码相同'}
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){return '两次密码不一致'}
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'http://www.liulongbin.top:3007/my/updatepwd',
            headers: {
                Authorization:localStorage.getItem('token') || ''
    
            },
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })

    


})