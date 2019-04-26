window.onload = function(){

    /**
     * @var inputs 登录表单所有input标签
     * 
     */
    var inputs = document.querySelectorAll('.box input')

    //给每一个input标签添加事件,加验证功能
    for(var i = 0 ; i < inputs.length-1 ; i++){
        //获取焦点
        inputs[i].onfocus = function(){
            window.placeholder = this.placeholder
            inputFouseStyle(this)
            switch(this.id){
                case 'username-inp' : validateUsername(this);break;
                case 'password-inp' : validatePassword(this);break;
            }
        }
        //失去焦点
        inputs[i].onblur = function(){
            inputBlurStyle(this)
            switch(this.id){
                case 'surepsd-inp' : validateSurePsd(this); break;
                case 'email-inp' : validateEmail(this); break;
            }
        }
    }
    //提交表单
    $('#register_form').on('submit',function(e){
        e.preventDefault()
        return submit()
    })


    /**
     * @function inputFouseStyle 元素获取焦点时，隐藏当前元素placeHolder，显示下一个P元素
     * @param inpEle 当前input元素
     * 
     * @function inputBlurStyle 元素失去焦点时，显示当前元素placeHolder，隐藏下一个P元素
     * @param inpEle 当前input元素
     * 
     * @function validateUsername 验证用户名
     * @function validateUsernameExecute 验证用户名执行
     * @param inpEle 当前input元素
     * 
     * @function validatePassword 验证密码
     * @function validatePasswordExecute 验证密码执行
     * @param inpEle 当前input元素
     * 
     * @function validateSurePsd  确认密码
     * @param inpEle 当前input元素
     * 
     * @function validateEmail    验证邮箱
     * @param inpEle 当前input元素
     * 
     * @function submit 提交表单验证
     */

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
    function validateUsername(inpEle){
        window.onkeyup = function(){
            validateUsernameExecute(inpEle)
        }
    }
    function validateUsernameExecute(inpEle){
        inpEle.parentElement.style.borderColor = "#ddd"
        inpEle.value = inpEle.value.trim()
        var value = inpEle.value.trim()
        var ele = inpEle.parentElement.nextElementSibling
        if(value.length === 0){
            ele.style.visibility = 'visible'
            ele.style.color = "#cbcbcb"
            ele.innerText = "支持中文、英文、数字、“-”、“_”的组合，4-20个字符"
            return false
        }else if(value.length < 4){
            ele.style.visibility = 'visible'
            ele.style.color = "orange"
            ele.innerText = "长度只能在4-20个字符之间"
            return false
        }else if(/^\d+$/.test(value)){
            ele.style.visibility = 'visible'
            ele.style.color = "orange"
            ele.innerText = "用户名不能是纯数字，请重新输入！"
            return false
        }else if(!/^[a-zA-Z\d-_\u2e80-\u9fff]{4,20}$/.test(value)){
            ele.style.visibility = 'visible'
            ele.style.color = "orange"
            ele.innerText = "格式错误，仅支持汉字、字母、数字、“-”、“_”的组合"
            return false
        }else{
            ele.innerText = "用户名符合！"
            ele.style.color = "#29c24d"
            inpEle.parentElement.style.borderColor = "#29c24d"
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
        var password = document.getElementById('password-inp').value.trim()
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
    function validateEmail(inpEle){
        inpEle.parentElement.style.borderColor = "#ddd"
        inpEle.value = inpEle.value.trim()
        var value = inpEle.value.trim()
        var ele = inpEle.parentElement.nextElementSibling
        if(value.length === 0) return false
        if(!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9a-z]{2,9}\.[a-z]{2,6}(\.[a-z]{2,3})?$/i.test(value)){
            ele.style.color = "orange"
            ele.innerText = "邮箱格式错误"
            ele.style.visibility = 'visible'
            return false
        }
        ele.style.color = "#29c24d"
        ele.innerText = "ok!"
        inpEle.parentElement.style.borderColor = "#29c24d"
    }
    function submit(){
        for(var i = 0 ; i < inputs.length-1 ; i++){
            if(inputs[i].id === 'username-inp'){
                if(!/^[a-zA-Z\d-_\u2e80-\u9fff]{4,20}$/.test(inputs[i].value.trim()) || /^\d+$/.test(inputs[i].value.trim())){
                    alert('注册失败')
                    inputs[i].focus()
                    validateUsernameExecute(inputs[i])
                    return false
                }
            }
            if(inputs[i].id === 'password-inp'){
                if(!/.{6,20}/.test(inputs[i].value.trim())){
                    alert('注册失败')
                    inputs[i].focus()
                    validatePasswordExecute(inputs[i])
                    return false
                }
            }
            if(inputs[i].id === 'surepsd-inp'){
                if(inputs[i].value !== inputs[i-1].value.trim()){
                    alert('注册失败')
                    inputs[i].focus()
                    validateSurePsd(inputs[i])
                    return false
                }
            }
            if(inputs[i].id === 'email-inp'){
                if(!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9a-z]{2,9}\.[a-z]{2,6}(\.[a-z]{2,3})?$/i.test(inputs[i].value.trim())){
                    alert('注册失败')
                    inputs[i].focus()
                    validateEmail(inputs[i])
                    return false
                }
            }
        }
        var formDate = $('#register_form').serialize()
        $.ajax({
            url: '/register',
            type: 'post',
            data: formDate,
            dataType: 'json',
            success: function(data){
                var err_code = data.err_code
                if(err_code === 0){
                    alert('注册成功！')
                    window.location.href = '/'
                    return
                }else if(err_code === 1){
                    $('#email-inp').focus()
                    $('#email-tip').css({visibility:'visible',color:'#e1231a'}).html('该邮箱已注册')
                    return
                }else if(err_code === 500){
                    alert('服务器忙，请稍后再试')
                }
                
            }
        })
    }

}