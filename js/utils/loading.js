/**
 * Created by Administrator on 2017/4/28.
 */

;(function ($) {
    "use strict";
    function Loading(options) {
        this.count = 0;
    }
    //flag为true的时候，强制隐藏。
    Loading.prototype.hideLoading = function (flag) {
        if (flag === true) {
            this.count = 0;
            $('#loading-dialog').remove();
        } else {
            if (this.count <= 1) {
                this.count = 0;
                $('#loading-dialog').remove();
            } else {
                this.count = this.count - 1;
            }
        }
    };
    Loading.prototype.showLoading = function (msg) {
        if (msg === undefined) {
            msg = '请等待。';
        }
        this.count = this.count + 1;
        if (this.count === 1) {
            $('body').append('<div class="dialog-loading dialog-loading-notice show" id="loading-dialog" data-count="0"><div class="dialog-loading-cnt"><i class="dialog-loading-bright"></i>' + msg + '</div></div>');
        }
    };
    var loadSingleton = new Loading();
    $.loading = {
        hideLoading: function (flag) {
            loadSingleton.hideLoading(flag);
        },
        showLoading: function (msg) {
            loadSingleton.showLoading(msg);
        }
    };
})(jQuery ? jQuery : Zepto);