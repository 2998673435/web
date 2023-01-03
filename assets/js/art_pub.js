$(function  () {
    initCate()
    initEditor()
    function initCate(){
        $.ajax({
            method:'get',
            url:'http://www.liulongbin.top:3007/my/article/cates',
            headers: {
                Authorization:localStorage.getItem('token') || ''

            },
            success:function  (res) {
                if(res.status !== 0){
                    return layui.layer.msg('初始化文章分类失败')
                }
                layui.layer.msg('初始化文章分类成功')
                var htmlStr = template('tpl-cate',res)
                $('[name=cate_id]').html(htmlStr)
                // 调用form.render()方法重新渲染
                layui.form.render()

            }
        })
    }



    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 为选择封面的按钮，绑定点击事件处理函数
    $('#btnChooseImage').on('click',function  () {
        $('#coverFile').click()
    })

    // 监听coverFile的change事件，获取用户选择的文件列表
    $('#coverFile').on('change',function(e){
        // 获取到文件的列表数组
        var files = e.target.files
        if(files.length=== 0){
            return 
        }
        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域


    })



    // 定义文章的发布状态
    var art_state = '已发布'

    // 定义文章的发布状态,绑定点击事件处理函数
    $('#btnSave2').on('click',function(){
        art_state = '草稿'
    })


    // 为表单绑定 submit 提交事件
    $('#form-pub').on('submit',function(e){
        // 1.阻止表单的默认提交事件
        e.preventDefault()
        // 2.基于 form 表单，快速创建一个 FormData 对象
        var fd = new FormData($(this)[0])
        // 3.将文章的发布状态，存到fd中
        fd.append('state',art_state)
        // 4.将封面裁剪后的图片，通过画布，间接输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 5.将文件对象，存储到fd中
                fd.append('cover_img',blob)
                // 6.发起ajax请求
                publishArticle(fd)
            })
       

    })


    // 
    function publishArticle(fd){
        $.ajax({
            method:'post',
            url:'http://www.liulongbin.top:3007/my/article/add',
            headers: {
                Authorization:localStorage.getItem('token') || ''

            },
            data:fd,
            // 提交FormData数据，必须添加以下两个配置项
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('发布文章失败！')
                }
                layui.layer.msg('发布文章成功')
                console.log(res)
                // 发布文章后跳转到文章列表
                setTimeout('location.href="/article/art_list.html"',2000)

            }

        })
    }


})