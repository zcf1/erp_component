/**
 * Created by apple on 16/6/28.
 */
//UI 效果插件
;(function($){
    "use strict";

    function Tips(opts){

    }

    /**
     * 创建模板
     * @param html
     * @returns {string}
     * @constructor
     */
    Tips.prototype.Tel = function(opts){
        var tel = [];
        tel.push('<div class="xfd-loading-block animated bounceIn">');
        tel.push('<div class="xfd-loading-cnt">');
        tel.push(this.icion(opts.icion));
        tel.push('<p>'+(opts.content)+'</p>');
        tel.push('</div>');
        tel.push('</div>');
        return tel.join('');
    }

    /**
     * 删除DIV 层
     * @param html
     * @returns {string}
     */
    Tips.prototype.close = function(demo,tel,opts){
        setTimeout(function(){
            console.log('执行')
            demo.remove();
            opts.callback ? opts.callback() : null;
            /*tel.addClass('bounceOut').animationEnd(function(){

            })*/
                //
        },opts.time);
    }

    /**
     * 创建图标
     * @param type
     * @returns {string}
     */
    Tips.prototype.icion = function(info){
        //图标 checkcircle 成功 crosscircle 失败 exclamationcircle 警告 infocircle 提示
        var icion_cls = (function(info){
            var icion_obj = {
                'success':'pe-7s-check',
                'info':'pe-7s-info',
                'danger':'pe-7s-close-circle'
            }
            return icion_obj[info];
        })(info);
        return '<i class="'+(icion_cls)+'"></i>';
    }

    $.Tips  = {
        info:function(opts){
            var del = {
                content:'提示消息',
                icion:'info',
                time:2000,
                callback:null
            };
            var del_opts = $.extend({},del,opts);
            var _messageDiv = document.createElement('div');
            document.body.appendChild(_messageDiv);
            var tel = $(new Tips().Tel(del_opts));
            $(_messageDiv).append(tel);
            new Tips().close(_messageDiv,tel,del_opts)
        }
    }

})(jQuery?jQuery:Zepto);