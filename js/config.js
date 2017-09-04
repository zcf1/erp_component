/**
 *
 * @type {{basePath, isDebug}}
 * basePath:配置ajax 请求数据
 * isDebug 是否开启页面权限
 */
window.globalConfig = (function(){
    return {
        //basePath: 'http://192.168.1.100:8080/erp/',
        basePath:'http://192.168.1.70:8082/erp/',
        isDebug:true
        //basePath:'http://erp3.api1.cheweiguanjia.com/erp/'
    }
})();