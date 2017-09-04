/**
 * Created by apple on 16/6/24.
 */
//UI 动画事件回调函数
;(function($){
    "use strict";
    var support = {};
    var doc = window.document;
    support.transition = (function() {
        var transitionEnd = (function() {
            // https://developer.mozilla.org/en-US/docs/Web/Events/transitionend#Browser_compatibility
            var element = doc.body || doc.documentElement;
            var transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
            };

            for (var name in transEndEventNames) {
                if (element.style[name] !== undefined) {
                    return transEndEventNames[name];
                }
            }
        })();

        return transitionEnd && {end: transitionEnd};
    })();
    support.animation = (function() {
        var animationEnd = (function() {
            var element = doc.body || doc.documentElement;
            var animEndEventNames = {
                WebkitAnimation: 'webkitAnimationEnd',
                MozAnimation: 'animationend',
                OAnimation: 'oAnimationEnd oanimationend',
                animation: 'animationend'
            };

            for (var name in animEndEventNames) {
                if (element.style[name] !== undefined) {
                    return animEndEventNames[name];
                }
            }
        })();
        return animationEnd && {end: animationEnd};
    })();

    $.fn.transitionEnd = function(callback) {
        var endEvent = support.transition.end;
        var dom = this;

        function fireCallBack(e) {
            callback.call(this, e);
            endEvent && dom.off(endEvent, fireCallBack);
        }

        if (callback && endEvent) {
            dom.on(endEvent, fireCallBack);
        }

        return this;
    };
    $.fn.animationEnd = function(callback) {
        var endEvent = support.animation.end;
        var dom = this;

        function fireCallBack(e) {
            callback.call(this, e);
            endEvent && dom.off(endEvent, fireCallBack);
        }

        if (callback && endEvent) {
            dom.on(endEvent, fireCallBack);
        }

        return this;
    };
})(jQuery?jQuery:Zepto);



