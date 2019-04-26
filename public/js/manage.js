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
        $('table').html(head)
        $.ajax({
            url:'/userSys',
            type:'get',
            dataType:'json',
            success:function(data){
                data.forEach(function(ele,index){
                    var str = `<tr>
                               <td><input type="checkbox" name="" id="id123"></td>
                               <td><label for="id123">${index+1}</label></td>
                               <td>${ele._id}</td>
                               <td>${ele.nickname}</td>
                               <td>${ele.email}</td>
                               <td>${ele.password}</td>
                               <td>${ele.last_modified_time}</td>
                               <td>${ele.status}</td>
                               <td>
                                   <a id=${ele._id} class="edit-user" href="javascript:void(0)">编辑</a>
                                   <a id=${ele._id} class="delete-user" href="javascript:void(0)">删除</a>
                               </td>
                               </tr>`
                    var tr = document.createElement('tr')
                    tr.innerHTML = str
                    $('table').append(tr)
                })
                ergodicUser()
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

    
})