$(function(){

    //弹出(关闭)编辑资料框
    $("#modify_data").on('click',function(){
        $('.mask_modify').show()
    })
    $(".close").on('click',function(){
        $('.mask_modify').hide()
    })
    //弹出(关闭)更换头像框
    $("#modify_avatar").on('click',function(){
        $('.mask_avatar').show()
    })
    $(".close").on('click',function(){
        $('.mask_avatar').hide()
    })
    //弹出(关闭)修改密码框
    $("#modify_psd").on('click',function(){
        $('.mask_psd').show()
    })
    $(".close").on('click',function(){
        $('.mask_psd').hide()
    })


    //绑定提交资料事件
    $('#modify_data_form').on('submit',function(e){
        e.preventDefault();
        return modify_submit()
    })
    //绑定上传头像事件
    $('#avatar_file').on('change',function(e){
        if(typeof FileReader == 'undefined'){
            alert('当前浏览器不支持FileReader接口')
            return false
        }
        var file = $(this)[0].files[0]
        var render = new FileReader()
        render.onload = function(e){
            $('.mask_avatar img').attr('src',e.target.result)
        }
        render.readAsDataURL(file)
    })
    //绑定提交头像事件
    $('#avatar_form').on('submit',function(e){
        e.preventDefault()
        var file = $('#avatar_file')[0].files[0]
        if(!file){
            alert('请先上传头像')
            return false
        }
        var extName = ''
        switch(file.type){
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if(extName.length === 0){
            alert('只支持png和jpg格式图片')
            return false
        }
        if(file.size > 2097152){
            alert('图片大小不得超过2M')
            return false
        }
        var fd = new FormData()
        fd.append('file',file)
        $.ajax({
            url:'/modify_avatar',
            type:'post',
            data:fd,
            processData : false, //不处理发动的数据
            contentType : false, //不要去设置Content-Type请求头
            dataType:'json',
            success:function(data){
                if(data.err_code === 0){
                    window.location.reload()
                    alert('保存成功')
                    return
                }
                if(data.err_code === 5){
                    alert('你还未登录，请先登录')
                    window.location.href = '/login'
                    return
                }
                alert('上传失败')
            }
        })
    })
    //提交更改密码表单
    $('#modify_psd_form').on('submit',function(e){
        e.preventDefault();
        return psd_submit()
    })

   

    //验证
    $('#old_psd').on('focus',function(){
        window.placeholder = this.placeholder
        inputFouseStyle(this)
    })
    $('#old_psd').on('blur',function(){
        inputBlurStyle(this)
        window.onkeyup = function(){
            if($('#old_psd').val().length >= 6){
                $('#old_psd_tip')[0].style.visibility = 'hidden'
            }
        }
    })
    $('#new_psd').on('focus',function(){
        window.placeholder = this.placeholder
        inputFouseStyle(this)
        validatePassword(this)
    })
    $('#new_psd').on('blur',function(){
        inputBlurStyle(this)
    })
    $('#sure_psd').on('focus',function(){
        window.placeholder = this.placeholder
        inputFouseStyle(this)
    })
    $('#sure_psd').on('blur',function(){
        inputBlurStyle(this)
        validateSurePsd(this)
    })


    //提交资料函数
    function modify_submit(){
    var dataform = $('#modify_data_form').serialize()
    $.ajax({
        url:'/modify_data',
        type:'get',
        data:dataform,
        success:function(data){
            if(data.err_code === 0){
                alert('修改成功')
                window.location.href = '/user'
                return
            }
            if(data.err_code === 5){
                alert('你还未登录，请先登录')
                window.location.href = '/login'
                return
            }
            if(data.err_code === 500){
                alert('修改失败')
                return
            }
        }   
        })
    }
    function inputFouseStyle(inpEle){
        inpEle.placeholder = ""
        var ele = inpEle.parentElement.nextElementSibling
        if(ele.nodeName === 'P'){
            ele.style.visibility = 'visible'
        }
    }
    function inputBlurStyle(inpEle){
        inpEle.placeholder = window.placeholder
        var ele = inpEle.parentElement.nextElementSibling
        if( inpEle.value.trim().length === 0 && ele.nodeName === 'P'){
            ele.style.visibility = 'hidden'
        }
    }
    function validatePassword(inpEle){
        window.onkeyup = function(){
            validatePasswordExecute(inpEle)
        }
    }
    function validatePasswordExecute(inpEle){
        inpEle.parentElement.style.borderColor = "#ddd"
        inpEle.value = inpEle.value.trim()
        var value = inpEle.value.trim()
        var ele = inpEle.parentElement.nextElementSibling
        var strength = 0
        if(value.length === 0){
            ele.style.visibility = 'visible'
            ele.style.color = "#cbcbcb"
            ele.innerText = "建议使用字母、数字和符号两种及以上的组合，6-20个字符"
            return false
        }
        if(value.length < 6){
            ele.style.visibility = 'visible'
            ele.style.color = "orange"
            ele.innerText = "长度只能在6-20个字符之间"
            return false
        }
        if(/\d+/.test(value)){
            strength++
        }
        if(/[a-z]+/i.test(value)){
            strength++
        }
        if(/[\W|_]+/i.test(value)){
            strength++
        }
        if(strength === 1){
            ele.style.color = "orange"
            ele.innerText = "有被盗风险,建议使用字母、数字和符号两种及以上组合！"
        }
        if(strength === 2){
            ele.style.color = "#29c24d"
            ele.innerText = "安全强度适中，可以使用三种以上的组合来提高安全强度！"
            inpEle.parentElement.style.borderColor = "#29c24d"
        }
        if(strength === 3){
            ele.style.color = "#29c24d"
            ele.innerText = "你的密码很安全！"
            inpEle.parentElement.style.borderColor = "#29c24d"
        }
    }
    function validateSurePsd(inpEle){
        inpEle.parentElement.style.borderColor = "#ddd"
        var password = document.getElementById('new_psd').value.trim()
        inpEle.value = inpEle.value.trim()
        var value = inpEle.value.trim()
        var ele = inpEle.parentElement.nextElementSibling
        if(password.length === 0) return
        if(password != value || value.length === 0){
            ele.style.color = "orange"
            ele.innerText = "两次密码输入不一致"
            ele.style.visibility = 'visible'
            return false
        }
        ele.style.color = "#29c24d"
        ele.innerText = "ok!"
        inpEle.parentElement.style.borderColor = "#29c24d"
    }
    function psd_submit(){
        if($('#old_psd').val().trim().length < 6){
            alert('修改失败')
            $('#old_psd').focus()
            $('#old_psd_tip')[0].style.color = 'orange'
            $('#old_psd_tip').html('请输入6-20位密码')
            return false
        }
        if(!/.{6,20}/.test($('#new_psd').val().trim())){
            alert('修改失败')
            $('#new_psd').focus()
            validatePasswordExecute($('#new_psd')[0])
            return false
        }
        if($('#sure_psd').val() !== $('#new_psd').val().trim()){
            alert('修改失败')
            $('#sure_psd').focus()
            validateSurePsd($('#sure_psd')[0])
            return false
        }
        var formDate = $('#modify_psd_form').serialize()
        $.ajax({
            url: '/modify_psd',
            type: 'post',
            data: formDate,
            dataType: 'json',
            success: function(data){
                var err_code = data.err_code
                if(err_code === 0){
                    alert('修改成功！')
                    window.location.href = '/login'
                    return
                }
                if(err_code === 1){
                    alert('修改失败')
                    $('#old_psd').focus()
                    $('#old_psd_tip').css({visibility:'visible',color:'#e1231a'}).html('密码错误')
                    return
                }
                if(data.err_code === 5){
                    alert('你还未登录，请先登录')
                    window.location.href = '/login'
                    return
                }
                if(err_code === 500){
                    alert('服务器忙，请稍后再试')
                }
            }
        })
    }
})