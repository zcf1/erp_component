/**
 * Created by apple on 16/6/28.
 */
//UI 效果插件
;(function($){
    "use strict";

    function Toast(options){

    }

    Toast.defaultTime = 3000;
    Toast.isShowIcion = true;

    Toast.Tel = function(html,icion){
        var myDate=new Date().getTime();
        var tel = [];
        tel.push('<div class="xfd-loading-block">');
        tel.push('<div class="xfd-loading-cnt">');
        tel.push(Toast.icion(icion));
        tel.push('<p>'+(html||'数据加载中')+'</p>');
        tel.push('</div>');
        tel.push('</div>');
        Toast.dialog = $(tel.join('')).appendTo("body");
    }

    Toast.icion = function(type){
        //图标 checkcircle 成功 crosscircle 失败 exclamationcircle 警告 infocircle 提示
        var icion;
        var icionType = type ? 'icon-'+type : 'xfd-loading-bright';
        return icion = Toast.isShowIcion ? '<i class="'+(icionType)+'"></i>' : ' ';
    }

    Toast.hasToast = function(){
        var isToast = false;
        if($('.xfd-loading-block')&&$('.xfd-loading-block').length>0){
            isToast = true;
        }
        return isToast;
    }

    Toast.open = function(tips,icion,callback){

        Toast.Tel(tips,icion);

        setTimeout(function(){
            Toast.dialog.addClass('xfd-toast-visible');
            if(callback){
                callback.call(callback);
            }
        },50);
    }

    Toast.close = function(callback){
        if(!Toast.dialog){
            return false;
        }
        setTimeout(function(){
            Toast.dialog.remove();
            if(callback){
                callback.call(callback)
            }
        },50);
    }

    $.toast  = {
        open:function(html,icion,callback){
            if(Toast.hasToast()){
                return false;
            }
            Toast.open(html,icion,callback);
        },
        close:function(){
            Toast.close();
        },
        info:function(html,icion,callback){
            if(Toast.hasToast()){
                return false;
            }
            Toast.open(html,icion,callback);
            setTimeout(function() {
                Toast.close(callback);
            },Toast.defaultTime);
        }
    }

})(jQuery);