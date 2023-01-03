$(function(){
    // 定义一个查询的参数对象，用于在发起ajax请求时提交到服务器
    var q = {
        pagenum: 1,
        pagesize: 1,
        cate_id: '',
        state: ''
    }
    initTable()
    // 获取文章列表数据的方法
    function initTable(){
        $.ajax({
            method:'get',
            // url:'http://www.liulongbin.top:3007/my/article/list',
            url:'http://127.0.0.1:82/get',
            // headers: {
            //     Authorization:localStorage.getItem('token') || ''
    
            // },
            data:q,
            success: function(res){
                console.log(res)
                if(res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table',res.data)
                $('tbody').html(htmlStr)
                // 调用渲染分页的方法
                 renderPage(res.data.total)
            }

        })
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date){
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth()+1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y +　'-' + m +　'-' + d  +　' ' + hh  +　':' + mm  +　':' + ss
    }
    // 定义补零的函数
    function padZero(n) {
        return n>9 ? n : '0'+n
    }

    // 初始化文章分类的方法
    initCate()
   function initCate() {
    $.ajax({
        type:'get',
        url:'http://www.liulongbin.top:3007/my/article/cates/',
        headers: {
            Authorization:localStorage.getItem('token') || ''

        },
        success:function(res){
            if(res.status!==0) {
                return layui.layer.msg(res.message)
            }
            var htmlStr = template('tpl-cate',res)
            
            $('[name=cate_id]').html(htmlStr)
            layui.form.render()
            
        }
    })
    
   }


    // 为筛选表单绑定submit事件
    $('#form-search').on('submit',function  (e) {
        alert('yes')
        e.preventDefault()
        // 获取筛选表单中选中的值
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        //  根据最新的
        initTable()
    })

    // 分页组件，渲染分页
    function  renderPage (total) {
        layui.laypage.render({
            elem:'pageBox', 
            count:total,   //总记录的条数
            limit:q.pagesize,     //每页显示几条数据
            curr:q.pagenum,      //设置默认被选中的分页
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],
            // 点击切换页码或调用renderPage函数时触发函数
            jump:function  (obj,first) {
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                
                //首次不执行
                if(!first){
                    initTable()
                }
            }
        })




    }


    // 通过代理的形式，为删除按钮绑定点击事件处理函数
    $('tbody').on('click','.btn-delete',function  () {
        // 获取删除按钮的个数
        var len = $('.btn-delete').length

        // 获取文章的id
        var Id = $(this).attr('data-id')
        layui.layer.confirm('确认删除？',{icon:2,title:'提示'},function(index){
            $.ajax({
                method:'get',
                url:'……/'+Id,
                headers: {
                Authorization:localStorage.getItem('token') || ''
                },
                success:function  () {
                    if(res.status !== 0){
                        return layui.layer.msg('删除文章失败')
                    }
                    layui.layer.msg('删除文章成功')
                    if(len === 1){
                        q.pagenum = q.pagenum ===  1 ? 1:q.pagenum -1
                    } 
                    initTable()
                }


            })
        })
    })

















})