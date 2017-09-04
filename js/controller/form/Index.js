define(['vue','utils/vaildform'],
    function (Vue) {
        $('#formData').submit(function(){
            console.log($.vaildform.init($(this),{all_err_show:true}))
            return false;
        })

        $('#formData2').submit(function(){
            console.log($.vaildform.init($(this),{all_err_show:false}))
            return false;
        })

        $('#formData3').submit(function(){
            console.log($.vaildform.init($(this),{all_err_show:false}))
            return false;
        })
    });