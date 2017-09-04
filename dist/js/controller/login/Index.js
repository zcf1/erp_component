require(['utils/app'], function () {

    $('#formData').submit(function () {
        if ($.vaildform.init($(this), {all_err_show: true})) {
            var userInfo = {
                "account": $("#user-name").val(),
                "password": $("#inputPassword3").val()
            };
            window.location.href = '/pages/index.html';
        }
        return false;
    })
});