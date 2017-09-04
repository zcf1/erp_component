define(['utils/app','lib/RadialIndicator'],function(){
    $('#indicatorContainer').radialIndicator({
            barColor: '#007aff',//进度条颜色
            barWidth: 5,//进度条宽度
            barWidth: 3,//进度条宽度
            initValue: 0,//初始值
            roundCorner: true,//进度条圆角
            percentage: true,//百分比
            displayNumber: false,//显示数据
            radius: 55//定义半径。
        });
        //多久后显示进度条的初始状态
        setTimeout(function() {
            var radObj = $('#indicatorContainer').data('radialIndicator');
            $('#indicatorContainer').data('radialIndicator').animate(80);
        }, 0);



        $('#indicatorContainer2').radialIndicator({
            barColor: '#C78FC0',//进度条颜色
            barWidth: 5,//进度条宽度
            barWidth: 3,//进度条宽度
            initValue: 0,//初始值
            roundCorner: true,//进度条圆角
            percentage: true,//百分比
            displayNumber: false,//显示数据
            radius: 55//定义半径。
        });
        //多久后显示进度条的初始状态
        setTimeout(function() {
            var radObj = $('#indicatorContainer2').data('radialIndicator');
            $('#indicatorContainer2').data('radialIndicator').animate(80);
        }, 0);
})