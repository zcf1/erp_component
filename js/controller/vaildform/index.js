define(['vue','utils/vaildform'],
    function (Vue) {
        $('#inputPassword4').on('blur',function(){
            $.vaildform.init($(this),{all_err_show:true});
            return false;
        });
        // $('#formData').submit(function(){
        //     console.log($.vaildform.init($(this),{all_err_show:true}))
        //     return false;
        // });
    }
);