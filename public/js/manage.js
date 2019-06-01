$(function(){
    //左侧菜单栏点击下拉和更换图标功能
    // $('#dd-one').on('click',function(){
    //     $(this).toggleClass('dd-one-active')
    //     $('#ul-one').fadeToggle(200)
    // });
    // $('#dd-two').on('click',function(){
    //     $(this).toggleClass('dd-two-active')
    //     $('#ul-two').fadeToggle(200)
    // });
    // $('#dd-three').on('click',function(){
    //     $(this).toggleClass('dd-three-active')
    //     $('#ul-three').fadeToggle(200)
    // });


    function close_users(){
        $('.close').on('click',function(){
            $('.mask-users').hide()
        })
    }
    function close_news(){
        $('.close').on('click',function(){
            $('.mask-news').hide()
        })
    }
    function close_comment(){
        $('.close').on('click',function(){
            $('.mask-comment').hide()
        })
    }



    /** userSys */
    //渲染用户管理
    $('#dd-one').on('click',function(){
        $('thead').html('')
        $('tbody').html('')
        $('h1').hide()
        var head = `<tr>
                    <th style='width:45px'></th>
                    <th style='width:150px'>ID</th>
                    <th style='width:170px'>名称</th>
                    <th >email</th>
                    <th style='width:200px'>密码</th>
                    <th style='width:170px'>登录时间</th>
                    <th style='width:45px'>状态</th>
                    <th style='width:140px'>操作</th>
                    </tr>`
        $('table thead').html(head)
        $.ajax({
            url:'/userSys',
            type:'get',
            dataType:'json',
            success:function(data){
                pagingUser(data)
            }
        })
    })
    //遍历user //绑定删除用户事件
    function ergodicUser(){
        $('.delete-user').each(function(index,ele){
            $(ele).on('click',function(){
                var boo = confirm('确认要删除该用户吗？')
                if (!boo) return
                $.ajax({
                    url: '/delete_user',
                    type: 'get',
                    data: {
                        id: $(ele).attr('id')
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.err_code === 0) {
                            $(ele).parent().parent().remove()
                            ergodicUser()
                            return
                        }
                        alert("删除失败")
                    }
                })
            })
        })
        $('.edit-user').each(function(index,ele){
            $(ele).on('click',function(){
                $('.mask-users').show()
                $.ajax({
                    url: '/edit-users',
                    type: 'get',
                    data: {
                        id: $(ele).attr('id')
                    },
                    dataType: 'json',
                    success: function (data) {
                        var html = `
                                <s class="close"></s>
                                <table>
                                    <tr><td>用户ID</td><td>${data._id}</td></tr>
                                    <tr><td>用户名称</td><td>${data.nickname}</td></tr>
                                    <tr><td>用户邮箱</td><td>${data.email}</td></tr>
                                    <tr><td>用户密码</td><td>${data.password}</td></tr>
                                    <tr><td>用户创建时间</td><td>${data.created_time}</td></tr>
                                    <tr><td>用户登录时间</td><td>${data.last_modified_time}</td></tr>
                                    <tr><td>用户状态</td><td>${data.status}</td></tr>
                                    <tr><td>性别</td><td>${data.gender}</td></tr>
                                    <tr><td>生日</td><td>${data.birthday}</td></tr>
                                    <tr><td>关注数</td><td>${data.attentions.length}</td></tr>
                                    <tr><td>粉丝数</td><td>${data.fans.length}</td></tr>
                                    <tr style="height:200px"><td>简介</td><td>${data.bio}</td></tr>
                                </table>
                                `
                        $('.users-box').html(html)
                        close_users()
                    }
                })
            })
        })
    }
    //分页
    function pagingUser(data){
        // 总数;
        var data_totle = data.length;
        // 每页显示多少个;
        var showCount = 2;
        var pageCount = 1;

        function renderPage() {
            var html = ''
            for (var i = showCount * (pageCount - 1); i <= showCount * pageCount - 1;) {
                item = data[i++];
                if (!item) break;
                html += ` <tr>
                            <td><label for="id123">${i}</label></td>
                            <td style='font-size:10px'>${item._id}</td>
                            <td>${item.nickname}</td>
                            <td>${item.email}</td>
                            <td style='font-size:10px'>${item.password}</td>
                            <td>${item.last_modified_time}</td>
                            <td>${item.status}</td>
                            <td>
                                <a id=${item._id} class="edit-user" href="javascript:void(0)">查看</a>
                                <a id=${item._id} class="delete-user" href="javascript:void(0)">删除</a>
                            </td></tr>`
            }
            $('table tbody').html(html)
            ergodicUser()
        }

        function renderButton() {
            $(".pagination").pagination({
                totalData: data_totle,
                showData: showCount,
                eleCls: "btn btn-default",
                activeCls: "btn btn-danger active",
                prevCls: "btn btn-primary",
                nextCls: "btn btn-primary",
                callback: function (api) {
                    pageCount = api.getCurrent()
                    renderPage();
                }
            });
        }
        renderPage()
        renderButton()
    }
    

    /** newsSys */
    $('#dd-two').on('click',function(){
        $('thead').html('')
        $('tbody').html('')
        $('h1').hide()
        var head = `<tr>
                    <th style='width:45px'></th>
                    <th style='width:150px'>作者</th>
                    <th style='width:200px'>文章</th>
                    <th style='width:50px'>类别</th>
                    <th style='width:100px'>发布时间</th>
                    <th style='width:45px'>评论数</th>
                    <th style='width:45px'>阅读数</th>
                    <th style='width:140px'>操作</th>
                    </tr>`
        $('table thead').html(head)
        $.ajax({
            url:'/newsSys',
            type:'get',
            dataType:'json',
            success:function(data){
                pagingNews(data)
            }
        })
    })
    function ergodicNews(){
        $('.delete-news').each(function(index,ele){
            $(ele).on('click',function(){
                var boo = confirm('确认要删除该新闻吗？')
                if (!boo) return
                $.ajax({
                    url: '/delete_news',
                    type: 'get',
                    data: {
                        id: $(ele).attr('id')
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.err_code === 0) {
                            $(ele).parent().parent().remove()
                            ergodicNews()
                            return
                        }
                        alert("删除失败")
                    }
                })
            })
        })
        $('.edit-news').each(function(index,ele){
            $(ele).on('click',function(){
                $('.mask-news').show()
                $.ajax({
                    url: '/edit-news',
                    type: 'get',
                    data: {
                        id: $(ele).attr('id')
                    },
                    dataType: 'json',
                    success: function (data) {
                        var html = `
                                <s class="close"></s>
                                <h3>${data.title}</h3>
                                <div class="news-title">
                                    <span>${data.category}</span>&nbsp;
                                    <span>${data.author_name}</span>&nbsp;·
                                    <span>${data.release_time}</span>&nbsp;
                                    <span>${data.read_num}阅读</span>
                                </div>
                                <div class="p">${data.content} </div>
                                `
                        $('.news-box').html(html)
                        close_news()
                    }
                })
            })
        })

    }
    function pagingNews(data){
            // 总数;
            var data_totle = data.length;
            // 每页显示多少个;
            var showCount = 2;
            var pageCount = 1;
    
            function renderPage() {
                var html = ''
                for (var i = showCount * (pageCount - 1); i <= showCount * pageCount - 1;) {
                    item = data[i++];
                    if (!item) break;
                    html += ` <tr>
                                <td><label for="id123">${i}</label></td>
                                <td >${item.author_name}</td>
                                <td style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'>${item.title}</td>
                                <td>${item.category}</td>
                                <td style=''>${item.release_time}</td>
                                <td>${item.comment_num}</td>
                                <td>${item.read_num}</td>
                                <td>
                                    <a id=${item._id} class="edit-news" href="javascript:void(0)">审核</a>
                                    <a id=${item._id} class="delete-news" href="javascript:void(0)">删除</a>
                                </td></tr>`
                }
                $('table tbody').html(html)
                ergodicNews()
            }
    
            function renderButton() {
                $(".pagination").pagination({
                    totalData: data_totle,
                    showData: showCount,
                    eleCls: "btn btn-default",
                    activeCls: "btn btn-danger active",
                    prevCls: "btn btn-primary",
                    nextCls: "btn btn-primary",
                    callback: function (api) {
                        pageCount = api.getCurrent()
                        renderPage();
                    }
                });
            }
            renderPage()
            renderButton()
    }


    /** commentSys */
    $('#dd-three').on('click',function(){
        $('thead').html('')
        $('tbody').html('')
        $('h1').hide()
        var head = `<tr>
                    <th style='width:45px'></th>
                    <th style='width:150px'>文章ID</th>
                    <th style='width:100px'>评论人</th>
                    <th style='width:100px'>评论内容</th>
                    <th style='width:80px'>评论时间</th>
                    <th style='width:45px'>回复数</th>
                    <th style='width:45px'>点赞数</th>
                    <th style='width:140px'>操作</th>
                    </tr>`
        $('table thead').html(head)
        $.ajax({
            url:'/commentSys',
            type:'get',
            dataType:'json',
            success:function(data){
                pagingComment(data)
            }
        })
    })
    function ergodicComment(){
        $('.delete-comment').each(function(index,ele){
            $(ele).on('click',function(){
                var boo = confirm('确认要删除该评论吗？')
                if (!boo) return
                $.ajax({
                    url: '/delete_comment',
                    type: 'get',
                    data: {
                        id: $(ele).attr('id')
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.err_code === 0) {
                            $(ele).parent().parent().remove()
                            ergodicComment()
                            return
                        }
                        alert("删除失败")
                    }
                })
            })
        })
        $('.edit-comment').each(function(index,ele){
            $(ele).on('click',function(){
                $('.mask-comment').show()
                $.ajax({
                    url: '/edit-comment',
                    type: 'get',
                    data: {
                        id: $(ele).attr('id')
                    },
                    dataType: 'json',
                    success: function (data) {
                        var html = `
                                <s class="close"></s>
                                <table>
                                    <tr><td>文章ID</td><td>${data.article_id}</td></tr>
                                    <tr><td>评论人</td><td>${data.user_name}</td></tr>
                                    <tr><td>评论人ID</td><td>${data.user_id}</td></tr>
                                    <tr><td>评论时间</td><td>${data.comment_time}</td></tr>
                                    <tr><td>回复数</td><td>${data.replay_num}</td></tr>
                                    <tr><td>点赞数</td><td>${data.zan_num}</td></tr>
                                    <tr style="height:200px"><td>评论内容</td><td>${data.comment_content}</td></tr>
                                </table>
                                `
                        $('.comment-box').html(html)
                        close_comment()
                    }
                })
            })
        })
    }
    function pagingComment(data){
            // 总数;
            var data_totle = data.length;
            // 每页显示多少个;
            var showCount = 2;
            var pageCount = 1;
    
            function renderPage() {
                var html = ''
                for (var i = showCount * (pageCount - 1); i <= showCount * pageCount - 1;) {
                    item = data[i++];
                    if (!item) break;
                    html += ` <tr>
                                <td><label for="id123">${i}</label></td>
                                <td >${item.article_id}</td>
                                <td >${item.user_name}</td>
                                <td style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'>${item.comment_content}</td>
                                <td style=''>${item.comment_time}</td>
                                <td>${item.zan_num}</td>
                                <td>${item.replay_num}</td>
                                <td>
                                    <a id=${item._id} class="edit-comment" href="javascript:void(0)">审核</a>
                                    <a id=${item._id} class="delete-comment" href="javascript:void(0)">删除</a>
                                </td></tr>`
                }
                $('table tbody').html(html)
                ergodicComment()
            }
    
            function renderButton() {
                $(".pagination").pagination({
                    totalData: data_totle,
                    showData: showCount,
                    eleCls: "btn btn-default",
                    activeCls: "btn btn-danger active",
                    prevCls: "btn btn-primary",
                    nextCls: "btn btn-primary",
                    callback: function (api) {
                        pageCount = api.getCurrent()
                        renderPage();
                    }
                });
            }
            renderPage()
            renderButton()
    }
})