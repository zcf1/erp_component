/**
 * Created by apple on 16/6/28.
 */
//分页组件
;(function ($) {
    "use strict";

    function Pagination(opts) {
        this.pagination_id = null;
        this.pagination_id = 'pagination-' + new Date().getTime();
        this.go_pages_id = 'go-pages-' + new Date().getTime();
        opts.defaultCurrent = opts.defaultCurrent&&typeof opts.defaultCurrent==='string' ? window.parseInt(opts.defaultCurrent):opts.defaultCurrent;
        this.defaultProps = $.extend({}, {
            dom_box: null,
            defaultCurrent: 1,
            total: 500,
            defaultPageSize: 20,
            is_show_jump_page: true,
            beforeCallback: null,
            changeCallback: null,
            pageSizeOptions: [10, 20, 30, 40]
        }, opts);
        this.allPages = Math.ceil(this.defaultProps.total / this.defaultProps.defaultPageSize);
    }


    //上一页 绑定
    Pagination.prototype.prev = function () {
        var $this = this;
        $(this.defaultProps.dom_box).on('click', '.previous', function () {
            $this.defaultProps.defaultCurrent -= 1;
            $this.callback();
            $this.init();
        })
    };

    //下一页 绑定
    Pagination.prototype.next = function () {
        var $this = this;
        $('#' + this.pagination_id).on('click', '.next', function () {
            $this.defaultProps.defaultCurrent += 1;
            $this.callback();
            $this.init();
        })
    };
    //回调函数
    Pagination.prototype.callback = function () {
        var $this = this;
        $this.defaultProps.changeCallback ? $this.defaultProps.changeCallback($this, $this.defaultProps.defaultCurrent) : null;
    };

    //跳转绑定
    Pagination.prototype.jumpPrev = function () {
        var $this = this;
        $('#' + this.pagination_id).on('click', '.page-prev', function () {
            $this.defaultProps.defaultCurrent = Math.max(1, $this.defaultProps.defaultCurrent - 5)
            $this.callback();
        })
    };

    //跳转绑定
    Pagination.prototype.jumpNext = function () {
        var $this = this;
        $('#' + this.pagination_id).on('click', '.page-next', function () {
            var allPages = Math.ceil($this.defaultProps.total / $this.defaultProps.defaultPageSize);
            if (allPages <= 9) {
                $this.callback();
                return false;
            }
            var calcPage = Math.floor(($this.defaultProps.total - 1) / 10) + 1;
            $this.defaultProps.defaultCurrent = Math.min(calcPage, $this.defaultProps.defaultCurrent + 5);
            $this.callback();
        })
    };

    //分页事件
    Pagination.prototype.action = function () {
        var $this = this;
        $('#' + this.pagination_id).on('click', 'li>a[data-pageno]', function () {
            $this.defaultProps.defaultCurrent = $(this).data('pageno');
            $this.init();
            $this.callback();
        });
        $this.next();
        $this.prev();
        $this.jumpNext();
        $this.jumpPrev();
        if (this.defaultProps.is_show_jump_page) {
            $this.jumpPage();
        } else {
            this.defaultProps.is_show_jump_page + "false";
        }
    };
    //生成li节点
    Pagination.prototype.li_dom = function () {
        var pagerList = [];
        var jumpPrev = null;
        var jumpNext = null;
        var firstPager = null;
        var lastPager = null;
        var current = this.defaultProps.defaultCurrent;
        if (this.allPages <= 9) {
            for (var m = 0; m < this.allPages; m++) {
                pagerList.push('<li class="paginate_butto ' + ((m + 1) === this.defaultProps.defaultCurrent ? 'active' : '') + '" ><a href="javascript:;" data-pageNo="' + (m + 1) + '">' + (m + 1) + '</a></li>');
            }
        } else {
            jumpPrev = ('<li class="page-prev" ><a href="javascript:;">' + ('...') + '</a></li>');
            jumpNext = ('<li class="page-next"><a href="javascript:;">' + ('...') + '</a></li>');
            lastPager = ('<li><a href="javascript:;" data-pageNo="' + (this.allPages) + '">' + (this.allPages) + '</a></li>');
            firstPager = ('<li><a href="javascript:;" data-pageNo="' + (1) + '">' + (1) + '</a></li>');
            var left = Math.max(1, current - 2);
            var right = Math.min(current + 2, this.allPages);
            if (current - 1 <= 2) {
                right = 1 + 4;
            }

            if (this.allPages - current <= 2) {
                left = this.allPages - 4;
            }
            for (var n = left; n <= right; n++) {
                pagerList.push('<li class="paginate_butto ' + ((n) === this.defaultProps.defaultCurrent ? 'active' : '') + '" ><a href="javascript:;" data-pageNo="' + (n) + '">' + (n) + '</a></li>');
            }
            if (current - 1 >= 4) {
                pagerList.unshift(jumpPrev);
            }
            if (this.allPages - current >= 4) {
                pagerList.push(jumpNext);
            }
            if (left !== 1) {
                pagerList.unshift(firstPager);
            }
            if (right !== this.allPages) {
                pagerList.push(lastPager);
            }
        }
        return pagerList.join('');
    };
    //生成上下页
    Pagination.prototype.default_li = function () {
        var li_tel = [];
        li_tel.push(this.li_dom());
        if (this.defaultProps.total > 1) {
            if (this.defaultProps.defaultCurrent !== 1) {
                li_tel.unshift('<li class="paginate_button previous"><span ><img src="../static/images/pre-page.png"></span></li>');
            }
            if (this.defaultProps.defaultCurrent !== this.allPages) {
                li_tel.push('<li class="paginate_button next"><span><img src="../static/images/next-page.png"></span></li>');
            }
        }
        return li_tel.join('');
    };

    //创建选择跳转
    Pagination.prototype.go_pages = function () {
        var go_pages = [];
        go_pages.push('<div class="pagination-options" id="' + this.go_pages_id + '">跳转至');
        go_pages.push('<input type="text">');
        go_pages.push('页</div>');
        return go_pages.join('');
    };

    //创建ul
    Pagination.prototype.tel = function () {
        var tel = [];
        tel.push('<div class="pagination" id="' + (this.pagination_id) + '">');
        tel.push(this.default_li());
        tel.push('</div>');
        tel.push(this.defaultProps.is_show_jump_page ? this.go_pages() : '');
        return tel.join('');
    };

    Pagination.prototype.init = function () {
        $('#' + this.pagination_id).children().remove();
        $('#' + this.pagination_id).append($(this.default_li()));
    };

    Pagination.prototype.resetTotal = function (total, defaultPage) {
        this.defaultProps.total = total;
        this.defaultProps.defaultCurrent = defaultPage || 1;
        this.allPages = Math.ceil(this.defaultProps.total / this.defaultProps.defaultPageSize);
        this.init();
    };
    Pagination.prototype.jumpPage = function () {
        var $this = this;
        $('#' + $this.go_pages_id).find("input").keydown(function () {
            if (event.keyCode === 13) {
                var page = parseInt($(this).val());
                if (page == $(this).val() && page > 0 && page <= $this.allPages) {
                    $this.defaultProps.defaultCurrent = page;
                    $this.init();
                    $this.callback();
                } else {
                    $(this).val("");
                }
            }
        });
    };

    $.Pagination = {
        init: function (opts) {
            $(opts.dom_box).unbind().empty();
            var pagination = new Pagination(opts);
            $(pagination.defaultProps.dom_box).append($(pagination.tel()));
            pagination.action();
            return pagination;
        }
    }

})(jQuery ? jQuery : Zepto);