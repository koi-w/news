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

    //渲染用户管理
    $('#dd-one').on('click',function(){
        $('h1').hide()
        var head = `<tr>
                    <th></th>
                    <th></th>
                    <th>ID</th>
                    <th>名称</th>
                    <th>email</th>
                    <th>密码</th>
                    <th>登录时间</th>
                    <th>状态</th>
                    <th>操作</th>
                    </tr>`
        $('table thead').html(head)
        $.ajax({
            url:'/userSys',
            type:'get',
            dataType:'json',
            success:function(data){
                paging(data)
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
    }

    //分页
    function paging(data){
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
                            <td><input type="checkbox" name="" id="id123"></td>
                            <td><label for="id123">${i}</label></td>
                            <td>${item._id}</td>
                            <td>${item.nickname}</td>
                            <td>${item.email}</td>
                            <td>${item.password}</td>
                            <td>${item.last_modified_time}</td>
                            <td>${item.status}</td>
                            <td>
                                <a id=${item._id} class="edit-user" href="javascript:void(0)">编辑</a>
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
    
})