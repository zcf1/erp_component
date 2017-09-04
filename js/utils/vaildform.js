/**
 * Created by apple on 16/6/28.
 * 表单验证模块
 */
;(function($){
    "use strict";
    function Vaildform (obj,options){
        this.dataType = {
            sn: /[\w\W]+/,
            "*6-16": /^[\w\W]{6,16}$/,
            n: /^\d+$/,
            "n6-16": /^\d{6,16}$/,
            s: /^[\-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
            "s6-18": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
            p: /^[0-9]{6}$/,
            m: /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/,
            e: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/
        }
        this.config = {
            required: {
                dataType:'required',
                tip: '不能为空'
            }
        };
    }

    Vaildform.prototype.str = function(str) {
        return str.replace(/\s/g, "");
    }

    Vaildform.prototype.operation = function(form,dom,type){
        switch(type)
        {
            //两次密码验证
            case 'password':
                return $.trim(dom.val()).length<=0 ? false : true;
            //必填
            case 'required':
                return $.trim(dom.val()).length<=0 ? false : true;
            //验证手机号码
            case 'm':
                return this.dataType.m.test(dom.val()) ? true : false;
            //验证邮箱
            case 'email':
                return this.dataType.e.test(dom.val()) ? true : false;
            //验证数字类型
            case 'n':
                return this.dataType.n.test(dom.val()) ? true : false;
            //单选按钮必选验证
            case 'radio':
                var radioName = dom.attr('name');
                var value = form.find("input[name='" + radioName + "']:checked").length;
                return value <= 0 ? false : true;
            //复选框选择类型
            case 'checkbox':
                var radioName = dom.attr('name');
                var value = form.find("input[name='" + radioName + "']:checked").length;
                return value <= 0 ? false : true;

            case 'select':
                var radioName = dom.attr('name');
                var value = form.find("select[name='" + radioName + "']"+' ' + "option:selected").val();
                return Number(value) <= 0 ? false : true;
        }
    }

    //都为真时通过,显示全部需验证错误信息
    Vaildform.prototype.every = function(arr){
        var len = arr.length;
        for (var i = 0; i < len; i++)
        {
            if (!arr[i]){
                return false;
            }
        }

        return true;
    }

    //一个为通过就阻止接来下的xuan
    Vaildform.prototype.some = function(arr,active_arr){

        var len = arr.length;
        for (var i = 0; i < len; i++)
        {
            if (!arr[i]){
                active_arr[i].focus();
                return false;
                break;
            }
        }
    }

    /***
     *
     * @param form
     * @param del_opts
     * @returns {boolean}
     */
    Vaildform.prototype.activeForm = function(form,del_opts){
        var _this = this;
        var is_succers = true;

        if(del_opts.blur_err_show){
            form.parent().find("span").remove();
            //判断有无填写
            if(!_this.operation(form,form,form.data('type'))){
                form.addClass('error');
                var parents_dom = form.parents(del_opts.tips_dom_cls);
                parents_dom.find('span').length <= 0 ?
                parents_dom.append($("<span class='xfd-help-block text-danger'><i class='pe-7s-info'></i>"+(form.attr('tips'))+"</span>")) : null;
            }
            //判断是否为密码验证
            if(form.attr("recheck")&&form.val().length>0){
                var password_name = form.attr('recheck');
                var password_value = $("#"+password_name).val();
                if(password_value === form.val()){
                    is_succers = true;

                }else{
                    is_succers = false;
                    var password_parents = form.addClass('error').parents(del_opts.tips_dom_cls);
                    password_parents.append($("<span class='help-block m-b-none text-danger'><i class='pe-7s-info'></i>您两次输入的密码不一致</span>"))
                }
            }
            

            
        }else{
            var active_arr = [];
            var active_reg = [];
            var _input = form.find("input,select,textarea");
            var _password_dom = form.find("input[recheck]");
            _input.each(function(v,i){
                if(!_this.operation(form,$(this),$(this).data('type'))){
                    $(this).addClass('error');
                    var parents_dom = $(this).parents(del_opts.tips_dom_cls);
                    parents_dom.find('span').length <= 0 ?
                    parents_dom.append($("<span class='xfd-help-block text-danger'><i class='pe-7s-info'></i>"+($(this).attr('tips'))+"</span>")) : null;
                    active_arr.push($(this));
                    active_reg.push(false);

                    if(!del_opts.all_err_show){
                        is_succers =  _this.some(active_reg,active_arr);
                        return false;
                    }
                }else{

                    console.log('b')
                    var remove_dom = $(this).parents(del_opts.tips_dom_cls).find('span');
                    remove_dom.length >= 0  ? $(this).removeClass('error')&&remove_dom.remove() : null;
                    active_arr.push($(this));
                    active_reg.push(true);
                }
            });
            if(del_opts.all_err_show){
                is_succers = this.every(active_reg);
            }
            //最后验证密码是否一致
            if(_password_dom.length==1&&is_succers){
                var password_name = _password_dom.attr('recheck');
                var password_value = form.find("input[name='" + password_name + "']").val();
                if(password_value === _password_dom.val()){
                    is_succers = true;
                }else{
                    is_succers = false;
                    var password_parents = _password_dom.addClass('error').parents(del_opts.tips_dom_cls);
                    password_parents.append($("<span class='help-block m-b-none text-danger'><i class='pe-7s-info'></i>您两次输入的密码不一致</span>"))
                }

            }
        }
        


        

        

        return is_succers;
    }

    $.vaildform = {
        init:function(obj,opts){
            //表单验证初始化
            /***
             * tips_dom_cls 包含文本域,下拉框的最外层父元素
             * all_err_show 是否一次性报错 true 一次性显示所有错误 false 单独错误单独显示并且获得焦点
             * blur_err_show 是否为离开焦点时报错 true 是 false 点击按钮后显示报错
             */
            var del_opts = $.extend({
                tips_dom_cls :'.col-sm-10',
                all_err_show:true,
                blur_err_show:true
            },opts)
            return new Vaildform(obj,del_opts).activeForm(obj,del_opts);
        },
        clean:function(obj){
            //清除所有的表单
        }
    }
})(jQuery?jQuery:Zepto);