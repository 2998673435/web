$(function(){
    initArtCateList()
    function initArtCateList(){
        $.ajax({
            method:'get',
            url:'http://www.liulongbin.top:3007/my/article/cates',
            headers: {
                Authorization:localStorage.getItem('token') || ''
            },
            success:function(res){
                console.log(res)
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var indexAdd = null
    $('#btnAddCate').on('click',function(){
        indexAdd = layui.layer.open({
            // 弹出框类型-使没有确认按钮
            type:1,
            // 弹出框宽高
            area:['500px','250px'],
            title: '在线调试'
            ,content: $('#dialog-add').html()

        })
    })

    $('body').on('submit','#form-add',function(e){
        console.log($(this).serialize())
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'http://www.liulongbin.top:3007/my/article/addcates',
            headers: {
                Authorization:localStorage.getItem('token') || ''
    
            },
            data:$(this).serialize(),
            success:function(res){
                console.log(res)
                if(res.status !==0){
                    layui.layer.msg('新增分类失败！')
                    return  layui.layer.close(indexAdd)
                    
                }
                initArtCateList() 
                layui.layer.msg('新增分类成功！')
                layui.layer.close(indexAdd)

            }
        })

    })

    // 通过代理的形式，为btn-edit按钮绑定点击事件
    var indexEdit = null
    var form = layui.form
    $('tbody').on('click','#btn-edit',function(){
        indexEdit = layui.layer.open({
            type:1,
            area:['500px','250px'],
            title:'修改文章分类',
            content:$('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        // $(`tbody [data-id=${id}]`).parent().parent()[0].children[0].innerText //可根据id选中对应的DOM元素并获取内容
        $.ajax({
            type:'get',
            url:'http://www.liulongbin.top:3007/my/article/cates/'+id,
            headers: {
                Authorization:localStorage.getItem('token') || ''
    
            },
            success:function(res){
                form.val('form-edit',res.data)
            }
        })
        
    })


    // 通过代理的方式，为修改分类的表单绑定 submit 事件
    $('body').on('submit','#form-edit',function(e){
        console.log($(this).serialize())
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'http://www.liulongbin.top:3007/my/article/updatecate',
            headers: {
                Authorization:localStorage.getItem('token') || ''
    
            },
            data:$(this).serialize(),
            success: function (res) {
                if(res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('更新分类数据成功')
                initArtCateList()
            }
        })
    })

    // 通过代理的形式，为btn-edit按钮绑定点击事件
    $('body').on('click','.btn-delete',function(){
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 2, title:'提示'}, function(index){
            $.ajax({
                method:'get',
                url:'http://www.liulongbin.top:3007/my/article/deletecate/'+id,
                headers: {
                    Authorization:localStorage.getItem('token') || ''
        
                },
                success: function(res){
                    if(res.status !== 0){
                        return layui.layer.msg(res.message)
                    }
                    layui.layer.msg('删除分类成功！')
                    layui.layer.close(index)
                    initArtCateList()
                }


            })
            // layer.close(index);
        });


    })










})