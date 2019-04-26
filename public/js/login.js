 //弹出登录框
    // $("#btn-login").on("click",function(){
    //     $("#mask").show();
    //     var top = $(document).scrollTop();
    //     $(document).on('scroll.unable',function (e) {
    //         $(document).scrollTop(top);
    //     })
    // });
    // //关闭登录框
    // $("#mask-close").on("click",function(){
    //     $("#mask").hide();
    //     $(document).unbind("scroll.unable");
    // });

$(function(){
    //to index
    $(".close").on("click",function(){
        window.location.href = '/'
    });

    //登录验证
    $('#login_form').on('submit',function(e){
        e.preventDefault()
        return submit()
    })


    function submit(){ 
        var email = $('#username-inp').val()
        var password = $('#password-inp').val()
        if(!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9a-z]{2,9}\.[a-z]{2,6}(\.[a-z]{2,3})?$/i.test(email)){
            $('#tip').css({color:'orange'}).html('邮箱格式不正确')
            return false
        }
        if(password.length < 6 || password.length > 20){
            $('#tip').css({color:'orange'}).html('密码位数不对')
            return false
        }
        var dataform = $('#login_form').serialize()
        $.ajax({
            url:'/login',
            type:'post',
            data:dataform,
            dataType:'json',
            success:function(data){
                if(data.err_code === 0){
                    window.location.href = '/'
                    return
                }
                if(data.err_code === 1){
                    $('#tip').css({color:'red'}).html('该邮箱未注册')
                    return
                }
                if(data.err_code === 2){
                    $('#tip').css({color:'red'}).html('密码错误')
                    return
                }
                if(err_code === 500){
                    alert('服务器忙，请稍后再试')
                }
            }
        })
    }


});