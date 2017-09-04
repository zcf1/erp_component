/**
 * Created by apple on 2017/4/28.
 */
define(['utils/layout', 'utils/app', 'common/header'], function () {
    function exit_clean() {
        if (window.localStorage) {
            localStorage.clear();
            Cookies.remove('tk');
            window.location.href = '/index.html';
        }
    }

    /* 菜单id */
    var menuId = function (str) {
        var menuData = JSON.parse(window.localStorage.menuLists);
        // console.log(menuData.length);
        for (var i = 0, len = menuData.length; i < len; i++) {
            var _url = document.createElement('a');
            _url.href = menuData[i].url;
            var strUrl = _url.pathname.replace(/^([^\/])/, '/$1').split("/");
            var strLast = strUrl[strUrl.length - 1];
            if (strLast === str) {
                return menuData[i].menuId;
            }
        }
    }

    if (!window.globalConfig.isDebug) {
        if (typeof (Cookies.get('tk')) === "undefined") {
            $.dialog.info('无登录权限', {
                actions: [
                    {
                        label: '确定', class: 'primary', onClick: function () {
                            exit_clean();
                        }
                    }
                ]
            })
            return false;
        }

        $('#hide-iframe').attr("src", globalConfig.basePath + 'loginData?tk=' + Cookies.get('tk'));
    }
    $.Layout.init();
    /**
     * 退出业务逻辑功能
     */
    $('.exit').on('click', function () {
        exit_clean();
    })
    //全局监听事件做派发处理
    window.addEventListener('message', function (e) {
        switch (e.data.type) {
            case 'Redirect':
                $.dialog.info('登录过期,请重新登录', {
                    actions: [
                        {
                            label: '确定', class: 'primary', onClick: function () {
                                exit_clean()
                            }
                        }
                    ]
                })

                break;
            case 'iframeController':
                /**
                 * self.parent.LayoutController.iframeController(3,'button.html','按钮组件');
                 */
                var content = e.data.content;
                self.parent.LayoutController.iframeController(content.key, content.url, content.info);
                break;
            case 'getMenuId':
                var content = e.data.content;
                console.log(menuId(content.str))
                var activeIframe_key = $('#navPills').children('.active').data('navkey');
                $('iframe[name="iframe' + (activeIframe_key) + '"]')[0].contentWindow.postMessage({
                    content: {
                        type: 'getMenuId',
                        menuId: menuId(content.str)
                    }
                }, '*');
                // return user.menuId(content.str);
                break;
        }
    }, false);
});


/*** 跨域iframe 调用
 * window.parent.postMessage({
             type:'iframeController',
             content:{
                key:2,
                url:'http://127.0.0.1:8080/pages/button.html',
                info:'按钮组件'
             }
         },'*')


 window.addEventListener('message',function(event) {
        console.log(event)
},false);
 */
