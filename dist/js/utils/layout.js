/**
 * Created by apple on 16/6/28.
 */
/**
 * 切换卡组件
 *
 */
;(function ($) {
    "use strict";
    function Layout(options) {
        //存储插入dom 弹框的位置
        this.height_arr = [];
        this.menu_dom = null;
        this.menu_child = null;
        this.iframe_key = [];
        this.opts = options;
        this.onAnimate = false;
    }

    //主入口全部布局模块打开
    Layout.prototype.init = function () {
        this.menu();
        this.switch();
        this.height();
    }

    Layout.prototype.initMenuList = function (opts) {
        if (window.localStorage) {
            if (typeof(window.localStorage.menuLists) === "undefined") {
                return;
            }
            var menuData = JSON.parse(window.localStorage.menuLists);
            var menuNode = $(opts.menu_dom);
            var childClass = opts.menu_child.substr(1);
            //判断是否
            if (menuData !== "" && menuNode.length > 0) {
                //原有菜单清空
                menuNode.empty();
                var domStr = [];
                $.each(menuData, function (index, item) {
                    // 判断是否包含子菜单
                    if (item.subMunu.length > 0) {
                        domStr.push('<li>');
                        domStr.push('<a href="javascript:;">' + item.name + '</a>');
                        domStr.push('<ul class="nav ' + childClass + '">');
                        $.each(item.subMunu, function (childIndex, childMenu) {
                            domStr.push('<li><a href="' + childMenu.url + '" data-menukey="' + childMenu.menuId + '">' + childMenu.name + '</a></li>');
                        });
                        domStr.push('</ul>');
                        domStr.push('</li>');
                    } else {
                        domStr.push('<li><a href="' + item.url + '" data-menukey="' + item.menuId + '" class="single-menu">' + item.name + '</a></li>');
                    }
                });
                menuNode.append(domStr.join(''));
            }
        } else {
            alert('当前浏览器版本过低，请更换支持');
        }
    }

    //主题高度
    Layout.prototype.height = function (opts) {
        var _height = $(opts.main_dom).height();
        $(opts.main_dom).height(_height);
    }
    //菜单开关
    Layout.prototype.switch = function () {
        $(document).on('click', '[data-toggle="switch"]', function () {
            event.preventDefault();
            if ($(window).width() < 769) {
                $("body").toggleClass("show-sidebar");
            } else {
                $("body").toggleClass("hide-sidebar");
            }
        })
    }
    Layout.prototype.setBodySmall = function () {
        if ($(window).width() < 769) {
            $('body').addClass('page-small');
        } else {
            $('body').removeClass('page-small');
            $('body').removeClass('show-sidebar');
        }
    }


    //菜单初始化
    Layout.prototype.menu = function (options) {
        var $this = this;
        this.menu_dom = $(options.menu_dom);
        this.menu_child = this.menu_dom.find(options.menu_child);
        this.menu_dom.children('li').each(function () {
            if ($(this).children('ul').length <= 0) {
                $this.height_arr.push(0);
            } else {
                $this.height_arr.push($(this).children('ul').height());
            }
            $(this).children('ul').height(0);
        });
        this.action();
    }

    /***
     * 高亮子菜单样式
     * @param key
     */
    Layout.prototype.activeMenuLi = function (that,isClose) {
        var isClose = isClose ? isClose : false;
       
        var _ul = that.next('ul');
        that.parent().siblings("li").removeClass('active').find('ul').removeClass('on').height(0);
        var _index = that.parent('li').index();
        that.parent().toggleClass('active');
        if(!isClose){
            if (_ul.hasClass('on')) {
                _ul.height(0);
                _ul.removeClass('on');
            } else {
                _ul.addClass('on');
                _ul.height(this.height_arr[_index]);
            }
        }else{
            that.parent().addClass('active');
            _ul.addClass('on');
            _ul.height(this.height_arr[_index]);
        }

    }

    //菜单动画事件
    Layout.prototype.action = function () {
        var $this = this;
        if (this.menu_dom.find("li").has('ul').length <= 0) {
            return;
        }

        //左侧一级菜单栏展开监听
        this.menu_dom.find("li").has('ul').children('a').on('click', function () {
            $this.activeMenuLi($(this));
        });
    }


    //切换显示iframe 模板
    Layout.prototype.switchIframe = function (index) {
        location.hash = 'menukey=' + index;
        $(".xfd-content").children().removeClass("on-show");
        $(".xfd-content").find(".xfd-iframe[name=iframe" + index + "]").addClass("on-show");
    }

    //动态创建iframe 模板
    Layout.prototype.iframeTel = function (iframeArgument) {
        var tel = [];
        location.hash = 'menukey=' + iframeArgument.name;
        tel.push('<iframe class="xfd-iframe" name="iframe' + (iframeArgument.name) + '" data-id="' + (iframeArgument.name) + '" src="' + (iframeArgument.src) + '">');
        tel.push('</iframe>');
        $(tel.join('')).appendTo(".xfd-content");
    }

    //创建动态li标签 <li role="presentation" class="active"><a href="#">消息通知</a></li>
    Layout.prototype.creationLi = function (key, test) {
        var tel = [];
        tel.push('<li role="presentation" data-navkey="' + (key) + '" name="nav' + (key) + '"><a href="javascript:;"><span class="cross" data-navkey="' + (key) + '"><i></i></span>' + (test) + '</a></li>');
        var $newDom = $(tel.join('')).appendTo("#navPills");
        var width = parseInt($newDom.css('width'), 10);
        var totalWidth = parseInt($(this.opts.content_dom)[0].dataset.width, 10) + width + 200;
        var $contentDom = $(this.opts.content_dom);
        $contentDom[0].dataset.width = totalWidth;
        $contentDom.css('width', totalWidth + 'px');
        this.activeLi(key);
    }

    //点击导航切换不同容器层
    Layout.prototype.eventNav = function () {
        var _this = this;
        //iframe切换
        $('#navPills').on('click', 'li', function (e) {
            if (e.target.tagName.toLowerCase() === 'a') {
                var _index = $(this).data('navkey');
                _this.switchIframe(_index);
                _this.activeLi(_index);
                location.hash = 'menukey=' + _index;
                var _a = $("#side-menu").find("li>a[data-menukey=" + _index + "]");
                //非单个
                if(!_a.attr('class')){
                    var activeLiTarget = _a.parents("ul").prev('a');
                    _this.activeMenuLi(activeLiTarget,true);
                    $("#side-menu").children('li.child-active').removeClass('child-active');
                }else{
                    _a.parent('li.child-active').siblings('.child-active').removeClass('child-active');
                    $('#side-menu').find('li.active').removeClass('active')
                        .find('.nav-second-level.on').removeClass('on')
                        .height(0).find('li')
                        .removeClass('child-active');
                }

            }
        })
        //删除功能
        $('#navPills').on('click', '.cross', function () {
            var parentLi = $(this).closest('li');
            if (parentLi.hasClass('active')) {
                var pre = parentLi.prev();
                _this.activeLi(pre.data('navkey'));
                _this.switchIframe(pre.data('navkey'));
            }
            var parentWidth = parseInt(parentLi.css('width'), 10);
            var $contentDom = $(_this.opts.content_dom);
            var totalWidth = parseInt($contentDom[0].dataset.width, 10) - parentWidth - 2;
            $contentDom[0].dataset.width = totalWidth;
            $contentDom.css('width', totalWidth + 'px');
            var _index = $(this).data('navkey');
            _this.closeLi(_index);
            _this.iframe_key.splice(_this.iframe_key.indexOf(_index), 1);
        })
    }

    Layout.prototype.activeLi = function (key) {
        $("#navPills").find("li").removeClass("active");

        $("#side-menu").find("li>ul>li").removeClass("child-active");
        $("#side-menu").find("li>a[data-menukey=" + key + "]").parent().addClass("child-active");
        var currentLi = $("#navPills").find("li[name=nav" + key + "]").addClass("active");
        var currentLeft = currentLi.offset().left;
        var currentWith = currentLi.css('width');
        var leftPos = $(this.opts.leftBtn).offset().left;
        var rightPos = $(this.opts.rightBtn).offset().left;
        var _this = this;
        //判断左侧边界
        if (currentLeft < leftPos) {
            var diff = leftPos - currentLeft;
            $(_this.opts.content_dom).stop().animate({left: '+=' + (diff) + 'px'}, 500);
            //    判断右侧边界
        } else if (currentLeft + parseInt(currentWith, 10) > rightPos) {
            var diff = currentLeft + parseInt(currentWith, 10) - rightPos;
            $(_this.opts.content_dom).stop().animate({left: '-=' + (diff) + 'px'}, 500);
        }
    };

    //关闭Li Iframe
    Layout.prototype.closeLi = function (key) {
        $("#navPills").find("li[name=nav" + key + "]").remove();
        $(".xfd-content").find("iframe[name=iframe" + key + "]").remove();
    }

    /**
     *
     * @param key 菜单的key
     * @param href 菜单的
     * @param val
     */
    Layout.prototype.iframeController = function (key, href, val) {
        var _this = this;
        var iframeArgument = {};
        iframeArgument.name = key;
        iframeArgument.src = href;
        iframeArgument.value = val;
        /**
         * 添加iframe
         */
        if (_this.iframe_key.indexOf(key) == -1) {

            _this.iframe_key.push(key);
            _this.iframeTel(iframeArgument);
            _this.creationLi(key, val);
            _this.switchIframe(key);
        } else {
            _this.switchIframe(key);
            _this.activeLi(key);
        }
    }
    //动态创建外层li
    Layout.prototype.creationMenuLi = function (data) {

    }

    Layout.prototype.loadMenu = function (opts) {
        console.log('加载菜单数据')
    }
    //菜单动态创建iframe 格式
    Layout.prototype.creationIframe = function (opts) {
        var _this = this;
        var iframeArgument = {};
        var menu_dom = $(opts.menu_dom);
        //iframe控制
        menu_dom.find("li>a").on('click', function (e) {
            /**
             * 处理不含有子菜单
             */
            if($(this).hasClass('single-menu')){
                $('#side-menu').find('li.child-active').removeClass('child-active');
                $('#side-menu').find('li.active').removeClass('active')
                    .find('.nav-second-level.on').removeClass('on')
                    .height(0).find('li')
                    .removeClass('child-active');
            }else{
                $('#side-menu').find('.child-active').removeClass('child-active');
            }
            //叶子节点
            if ($(this).data('menukey')) {
                iframeArgument.name = $(this).data('menukey');
                iframeArgument.src = $(this).attr('href');
                _this.iframeController(iframeArgument.name, iframeArgument.src, $(this).text());
            }
            e.preventDefault();
        })
    }

    //顶部切换 左移
    Layout.prototype.moveLeft = function (opts) {
        var _this = this;
        $(opts.leftBtn).click(function () {
            var contentLeft = parseInt($(opts.content_dom).css('left'), 10);
            if (contentLeft >= -92) {
                if (!_this.onAnimate) {
                    _this.onAnimate = true;
                    $(opts.content_dom).animate({left: 0}, "slow", function () {
                        _this.onAnimate = false;
                    });
                }
            } else {
                if (!_this.onAnimate) {
                    _this.onAnimate = true;
                    $(opts.content_dom).animate({left: contentLeft + 200 + 'px'}, "slow", function () {
                        _this.onAnimate = false;
                    });
                }
            }
        });
    };

    //顶部切换 右移
    Layout.prototype.moveRight = function (opts) {
        var _this = this;
        $(opts.rightBtn).click(function () {
            var childrenLength = $(opts.content_dom).children().length;
            //三个以下是肯定不会填充整行的
            if (childrenLength >= 3) {
                var $lastLi = $(opts.content_dom).children('li:last-child');
                var liLeft = $lastLi.offset().left;
                var $rightBtn = $(opts.rightBtn);
                var btnLeft = $rightBtn.offset().left;
                var contentLeft = parseInt($(opts.content_dom).css('left'), 10);
                if (liLeft >= btnLeft) {
                    if (!_this.onAnimate) {
                        _this.onAnimate = true;
                        $(opts.content_dom).animate({left: contentLeft - 100 + 'px'}, "slow", function () {
                            _this.onAnimate = false;
                        });
                    }
                } else {
                    var diffNum = liLeft + parseInt($lastLi.css('width'), 10) - btnLeft;
                    if (diffNum > 0 && !_this.onAnimate) {
                        _this.onAnimate = true;
                        $(opts.content_dom).animate({left: contentLeft - diffNum + 'px'}, "slow", function () {
                            _this.onAnimate = false;
                        });
                    }
                }
            }
        });
    };

    Layout.prototype.initDropdown = function (opts) {
        $(opts.dropdown + ' .reload-page').click(function () {
            var onShow = $('.xfd-content').children('.on-show');
            var src = onShow.attr("src");
            onShow.attr("src", src).ready();
        });
        var _this = this;
        $(opts.dropdown + ' .close-other').click(function () {
            _this.deleteHide(opts);
            $(_this.opts.content_dom).animate({left: 0});
        });
        $(opts.dropdown + ' .close-all').click(function () {
            $(opts.content_dom).children('li').removeClass('active').eq(0).addClass('active');
            $('.xfd-content').children('iframe').removeClass('on-show').eq(0).addClass('on-show');
            _this.deleteHide(opts);
            $(_this.opts.content_dom).animate({left: 0});
        });
    };


    Layout.prototype.deleteHide = function (opts) {
        var _this = this;
        $(opts.content_dom).children('li').each(function (index, element) {
            if (index !== 0 && !$(element).hasClass('active')) {
                var width = parseInt($(element).css('width'), 10);
                var totalWidth = parseInt($(_this.opts.content_dom)[0].dataset.width, 10) - width - 2;
                var $contentDom = $(_this.opts.content_dom);
                $contentDom[0].dataset.width = totalWidth;
                $contentDom.css('width', totalWidth + 'px');
                $(element).remove();
                _this.iframe_key.splice(_this.iframe_key.indexOf($(element).data('navkey')), 1);
            }
        });
        $('.xfd-content').children('iframe').each(function (index, element) {
            if (index !== 0 && !$(element).hasClass('on-show')) {
                $(element).remove();
            }
        })
    };

    Layout.prototype.mockOpen = function () {
        $('body').append($('<div class="xfd-sweet-overlay top-sweet-overlay"></div>'));
    }

    Layout.prototype.mockClose = function () {
        $('.xfd-sweet-overlay').remove();
    }

    //小路由
    Layout.prototype.hashChange = function () {
        var _this = this;
        var location = window.location,
            oldURL = location.href,
            oldHash = location.hash;

        // 每隔100ms检测一下location.hash是否发生变化
        setInterval(function () {
            var newURL = location.href,
                newHash = location.hash;
            var _index = newHash.replace('#menukey=', '');
            // 如果hash发生了变化,且绑定了处理函数...
            if (newHash != oldHash) {
                if ($.inArray(parseInt(_index), _this.iframe_key) == -1) {
                    return false;
                } else {
                    _this.switchIframe(_index);
                    _this.activeLi(_index);
                };               
                oldURL = newURL;
                oldHash = newHash;
            }
        }, 100);
    }
    /**
     * 调用方式
     * @type {{alert: Zepto.dialog.alert, confirm: Zepto.dialog.confirm, info: Zepto.dialog.info}}
     */
    $.Layout = {
        init: function (param) {
            var opts = $.extend({}, {
                menu_dom: '#side-menu',
                main_dom: '#wrapper',
                menu_child: '.nav-second-level',
                content_dom: '#navPills',
                leftBtn: '.xfd-float-left',
                rightBtn: '.xfd-nav-right',
                dropdown: '.xfd-contabs-dropdown'
            }, param);
            window.LayoutController = new Layout(opts);
            LayoutController.initMenuList(opts);
            LayoutController.menu(opts);
            LayoutController.switch(opts);
            LayoutController.creationIframe(opts);
            LayoutController.eventNav(opts);
            LayoutController.moveLeft(opts);
            LayoutController.moveRight(opts);
            LayoutController.initDropdown(opts);
            LayoutController.setBodySmall();
            LayoutController.hashChange();
            $(window).bind("resize click", function () {
                LayoutController.setBodySmall();
            });
        }
    };
})(jQuery ? jQuery : Zepto);