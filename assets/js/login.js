$(function(){
    // 点击"去注册账号"的链接
    $('#link_reg').on('click',function(){

        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){

        $('.reg-box').hide()
        $('.login-box').show()
    })
// 表单验证
var form = layui.form
form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
          
          //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
          if(value === 'xxx'){
            alert('用户名不能为敏感词');
            return true;
          }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [ 
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ]
        ,repwd:function(value){
            // value为确认密码框的内容
            var pwd = $('.reg-box [name=password]').val()
            // 选择器之间加空格表示后代筛选
            if(pwd!==value){
                return '两次密码不一致！'
            }
        }
      }); 

})
// 弹出框
var layer = layui.layer
// 监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
    e.preventDefault()
    var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
    $.post('http://www.liulongbin.top:3007/api/reguser',data,function(res){
        if(res.status!==0){
            // return console.log(res.message)
            return layer.msg(res.message)
        }
        layer.msg('注册成功')
        // 模拟点击事件，注册成功后跳转登录页面
        $('#link_login').click()
    })
})

// 监听登录表单的提交事件
$('#form_login').on('submit',function(e){
    console.log($(this).serialize())
    e.preventDefault()
    $.ajax({
        url:'http://www.liulongbin.top:3007/api/login',
        method:'POST',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg('登录成功')
            // 将返回的token字符串保存到localStorage，若再次登录生成并返回新的token字符串则会覆盖原来的token字符串
            localStorage.setItem('token',res.token)
            location.href = '/index.html'
        }
        })
})
