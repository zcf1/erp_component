;(function ($) {
    "use strict";
    /**
     * 数据服务层封装
     * @param parameters
     * @returns {*}
     */
    var AESEncrypt = function (str, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.AES.encrypt(str, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    };

    /* 解密 */
    var AESDecrypt = function (str, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var decrypted = CryptoJS.AES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(str)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    };
    /**
     *
     * @param str MD5
     */
    var MD5Encrypt = function (str) {
        return CryptoJS.MD5(str);
    };

    var reLogin = function(dtd){
        //alert('当前页面已过期，请重新登录');
       // window.parent.postMessage({type:'Redirect'},'*');
        dtd.reject();
    };

    $.server = {
        res: function ( service_id, param, encryptType,type) {
            var dtd = $.Deferred();
            if ( typeof(param) === "undefined") {
                param ={};
            }
            if (typeof(encryptType) === "undefined") {
                encryptType = 'C_AES';
            }
            if (typeof(type) === "undefined") {
                type = 'post';
            }
            var encryptKey = 'asdfghjkqwertyui';
            var ApiPath = globalConfig.basePath+'act';
            var content, cookieTK;
            if (encryptType === 'plain') {
                content = param;
            } else if (encryptType === 'G_AES') {
                content = AESEncrypt(JSON.stringify(param), encryptKey);
            } else if (encryptType === 'C_AES') {
                //cookieTK = Cookies.get('tk');
                //if (typeof(cookieTK) === "undefined") {
                //    reLogin(dtd);
                //    return dtd.promise();
                //}
                //content = AESEncrypt(JSON.stringify(param), cookieTK.substring(0, 16));
            }
            var contentBody = {
                service_id: service_id,
                app_type: '2',
                ver_name: '3.7.0',
                sign: MD5Encrypt(JSON.stringify(param)).toString(),
                content: content
            };
            $.ajax({
                url: ApiPath,
                data: {
                    content: JSON.stringify(contentBody)
                },
                type: type,
                timeout: 30000,
                dataType: 'text',
                success: function (data) {
                    $.toast.close();
                    var ress = '';
                    if (encryptType === 'plain') {
                        ress += data;
                    } else if (encryptType === 'G_AES') {
                        ress += AESDecrypt(data, encryptKey);
                    } else if (encryptType === 'C_AES') {
                        ress += AESDecrypt(data, cookieTK.substring(0, 16));
                        //加密状态下，有可能返回非加密信息
                        if (ress === '') {
                            ress = data;
                        }
                    }
                    ress = JSON.parse(ress);
                    if (ress.r_code === 900 || ress.r_code === 901) {
                        reLogin(dtd);
                        return;
                    } else if ( ress.r_code === 999){
                        if (encryptType !== 'G_AES'){
                            alert('接口出现bug');
                            dtd.reject();
                            return;
                        }
                    }
                    if (encryptType === 'G_AES') {
                        if (typeof(ress.r_content.TK) === "undefined") {
                           
                        }else{
                            Cookies.set('tk', ress.r_content.TK, { expires: 30 });
                        }
                    }
                    dtd.resolve(ress);
                },
                beforeSend: function (xhr) {
                    $.toast.open();
                    if (encryptType === 'C_AES') {
                        xhr.setRequestHeader('tk', cookieTK);
                    }
                },
                error: function (xhr, type) {
                    //后台状态返回1 延迟加载成功
                    dtd.reject(xhr, type);
                }
            });
            /*--
             返回promise的作用是防止外部修改全局dtd 延迟对象的执行状态。
             return dtd;
             --*/ //返回promise对象
            return dtd.promise();
        },
        resource: function (url, param, type) {
            //创建延迟对象
            var dtd = $.Deferred();
            $.ajax({
                url: url,
                data: param ? param : {},
                type: type ? type : 'GET',
                timeout: 30000,
                success: function (data) {
                    dtd.resolve(data);
                },
                beforeSend: function (data) {
                },
                error: function (xhr, type) {
                    //后台状态返回1 延迟加载成功
                    dtd.reject(xhr, type);
                }
            });
            /*--
             返回promise的作用是防止外部修改全局dtd 延迟对象的执行状态。
             return dtd;
             --*/ //返回promise对象
            return dtd.promise();
        }
    }
})(jQuery);