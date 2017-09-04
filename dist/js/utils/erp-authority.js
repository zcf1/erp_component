if (window.localStorage) {
    var localList = window.localStorage.elementsList;
    if (typeof (localList) !== "undefined" && localList !== '') {
        var urlArr = window.location.href.split("/");
        var htmlName = '';
        if (urlArr[urlArr.length - 1] === '') {
            htmlName = urlArr[urlArr.length - 2].split("?")[0];
        } else {
            htmlName = urlArr[urlArr.length - 1].split("?")[0];
        }
        var elements = JSON.parse(localList);
        var hideStyle = document.createElement('style');
        hideStyle.type = 'text/css';
        elements.forEach(function (val, index, arr) {
            if (typeof (val) !== "undefined" || val !== '') {
                var path = val.element_name.split(".")[0];
                var dom = val.element_name.split(".")[1];
                if (htmlName.indexOf(path) > -1) {
                    if (typeof (dom) !== "undefined" || dom !== '') {
                        if (hideStyle.styleSheet) {
                            hideStyle.styleSheet.cssText += '.' + dom + '{display:none}\n';
                        } else {
                            hideStyle.appendChild(document.createTextNode('.' + dom + '{display:none}\n'));
                        }
                    }
                }
            }
        });
        document.getElementsByTagName('head')[0].appendChild(hideStyle);
    }
}