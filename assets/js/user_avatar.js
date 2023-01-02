$(function(){
    var layer = layui.layer




    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)


// 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click',function(){
        $('#file').click()
    })


    $('#file').on('change',function(e){
        alert('yes')
        console.log(e)
        // 获取用户上传的文件
        var filelist = e.target.files
        if(filelist.length === 0){
            return
        }
        var file = filelist[0]
        // 将文件转化为路径
        var imgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域



    })
    $('#btnUpload').on('click',function(){
        var dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method:'post',
            url:'http://www.liulongbin.top:3007/my/update/avatar',
            headers: {
                Authorization:localStorage.getItem('token') || ''
    
            },
            data:{
                avatar:dataURL
            },
            success: function(res){
                if(res.status !== 0){
                    layer.msg('res.message')
                }
                layer.msg('更换头像成功')
                window.parent.getUserInfo()
            }

        })
    })
})

// 
