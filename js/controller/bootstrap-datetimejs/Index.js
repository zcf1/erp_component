define(['moment','zh-cn','bootstrap-datetimepicker'],
    function () {

        $(function () {

            var s = $('#datetimepicker1').datetimepicker({
                format: 'YYYY-MM-DD'
            }).on('dp.change',function(e){
                console.log(e)
            });
            console.log(s.data("DateTimePicker"))
        });
        $(function () {
            var s = $('#datetimepicker2').datetimepicker({
                locale: 'zh-cn',
                format: 'YYYY-MM-DD HH:mm',
            })


        });
        $(function () {
            $('#datetimepicker3').datetimepicker({
                format: 'YYYY-MM-DD',
            });
        });
        $(function () {
            $('#datetimepicker4').datetimepicker({
                format: 'HH:mm',
            });
        });
        $(function () {
            $('#datetimepicker5').datetimepicker({
                format: 'YYYY-MM-DD HH:mm',
                minDate:new Date(),

            });
        });
        $(function () {
            $('#datetimepicker6').datetimepicker({
                format: 'YYYY-MM-DD HH:mm',
                maxDate:new Date()    
            });
        });
    });