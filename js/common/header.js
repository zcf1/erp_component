define([], function () {
    $('.dropdown-toggle').on('click',function(){
        $(".xfd-nav-menu").removeClass('open');
        $(".header-btn-more > a").removeClass('on');
       if($(this).parent().hasClass('open')){
            $(this).parent().removeClass('open');
        }else{
            $(this).parent().addClass('open');
        }
    })
    $("#header-menu-more").on('click',function(){
        $(".dropdown").removeClass('open');
        if($(".xfd-nav-menu").hasClass('open')){
            $(".xfd-nav-menu").removeClass('open');
            $(".header-btn-more > a").removeClass('on');
        }
        else{
            $(".xfd-nav-menu").addClass('open');
            $(".header-btn-more > a").addClass('on');
        }
            
    });

    
})