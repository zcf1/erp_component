/**
 * Created by apple on 16/6/28.
 * 表单验证模块
 */
;(function ($) {
    "use strict";
    function Vaildform() {
        //数据类型
        this.dataType = {
            phone: /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/,
            email: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
            url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
            enName: /^[a-zA-Z0-9_]$/,
            zhName: /^[\u4e00-\u9fa5]$/,
            float: /^(-?\d+)(\.\d+)?$/,
            int: /^(-?[1-9]\d*)|(0)$/,
            str: /^.+$/,
        };
        //验证类型
        this.validType = {
            enName: /^enName(\(\d+,\d+\))?$/,
            zhName: /^zhName(\(\d+,\d+\))?$/,
            float: /^float((\(\d+,\d+\))|(\[\d+,\d+]))?$/,
            int: /^int((\(\d+,\d+\))|(\[\d+,\d+]))?$/,
            url: /^url(\(\d+,\d+\))?$/,
            str: /^str(\(\d+,\d+\))?$/
        };
    }

    Vaildform.prototype.str = function (str) {
        return str.replace(/\s/g, "");
    };

    Vaildform.prototype.operation = function (form, dom) {
        console.log(dom);
        var domVal = dom.val();
        var type = dom.attr("valid-type");
        //简单类型在switch里面验证
        switch (type) {
            //验证手机号码
            case 'phone':
                return this.dataType.phone.test(domVal);
            //验证邮箱
            case 'email':
                return this.dataType.email.test(domVal);
            //单选按钮必选验证
            case 'radio':
            //复选框选择类型
            case 'checkbox':
                var radioName = dom.attr('name');
                var value = form.find("input[name='" + radioName + "']:checked").length;
                return value > 0;
            case 'select':
                var radioName = dom.attr('name');
                var value = form.find("select[name='" + radioName + "']" + ' ' + "option:selected").val();
                return Number(value) > 0;
            case 'reg':
                var reg = new RegExp(dom.attr('valid-reg'));
                return reg.test(domVal);
        }
        //验证密码字段
        var pwdReg = /^pwd(\(\d+,\d+\))?$/;
        if (pwdReg.test(type)) {
            var pwdDom = form.find("input[type='password']");
            if (pwdDom.length === 2) {
                if ($(pwdDom[0]).val() !== $(pwdDom[1]).val()) {
                    return false;
                }
            } else {
                var checkVal = $(dom.attr("pwd-dom")).val();
                if (domVal !== checkVal) {
                    return false;
                }
            }
            return this.testParam(dom);
        }
        var validType = this.validType;
        for (var s in validType) {
            if (validType[s].test(type)) {
                if (this.dataType[s].test(domVal)) {
                    return this.testParam(dom);
                } else {
                    return false;
                }
            }
        }
        return true;
    };


    Vaildform.prototype.testParam = function (dom) {
        var str = dom.attr("valid-type"),
            val = dom.val(),
            range = [],
            reg = /\d+/g,
            tempStr;
        while (tempStr = reg.exec(str)) {
            range.push(parseInt(tempStr[0]));
        }
        if (range.length === 0) {
            return true;
        }
        if (str.indexOf("(") !== -1) {
            return val.length >= range[0] && val.length <= range[1];
        } else {
            return val >= range[0] && val <= range[1];
        }
    };

    Vaildform.prototype.activeForm = function (form, del_opts) {
        var _this = this;
        var passFlag = true;
        var _input = form.find("input,select").not(".skip-val");
        _input.each(function () {
            if (!_this.operation(form, $(this))) {
                $(this).addClass('error');
                var parents_dom = $(this).parent();
                parents_dom.find('span').length <= 0 ? parents_dom.append($("<span class='help-block m-b-none text-danger'><i class='pe-7s-info'></i>" + ($(this).attr('tips')) + "</span>")) : null;
                passFlag =false;
                if (!del_opts.all_err_show) {
                    $(this).focus();
                    return false;
                }
            } else {
                var remove_dom = $(this).parent().find('span');
                remove_dom.length >= 0 ? $(this).removeClass('error') && remove_dom.remove() : null;
            }
        });
        return passFlag;
    };

    $.vaildform = {
        init: function (obj, opts) {
            //表单验证初始化
            /***
             * tips_dom_cls 包含文本域,下拉框的最外层父元素
             * all_err_show 是否一次性报错 true 一次性显示所有错误 false 单独错误单独显示并且获得焦点
             */
            var del_opts = $.extend({
                tips_dom_cls: '.col-sm-10',
                all_err_show: true
            }, opts);
            return new Vaildform().activeForm(obj, del_opts);
        }
    }
})(jQuery ? jQuery : Zepto);