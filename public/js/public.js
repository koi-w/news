$(function(){

    //search边框
    $(".search input[type=text]").focus(function(){
        $(this).css("border-color","#228ed8");
    }).blur(function(){
        $(this).css("border-color","");
    });

    //左侧导航栏定位  
    //toolbar
    $(window).scroll(function(){
        var topH = $(".top").height();
        if($(this).scrollTop() > topH){
            $("#clo1-menu").addClass("fixed");
        }else{
            $("#clo1-menu").removeClass("fixed");
        }

        if($(this).scrollTop() > 500){
            $(".tool-three").slideDown();
            $(".tool-one").css("margin-top","0px");
        }else{
            $(".tool-three").slideUp();
            $(".tool-one").css("margin-top","42px");
        }
    });
});