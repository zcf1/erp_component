define(['utils/app','highlight.pack'],
    function () {
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
        //$.toast.open('数据加载中');
        function Tips (icion){
            $.Tips.info({
                content:'提示消息',
                icion:icion,
                callback:function(){

                }
            });
        }
        $('#ts1').on('click',function(){
            Tips ('success');
        })
        $('#ts2').on('click',function(){
            Tips ('info');
        })
        $('#ts3').on('click',function(){
            Tips ('danger');
        })

        $('#tk1').on('click',function(){
            $.dialog.alert('密码错误!', function () {
                //alert('我是密码错误回调')

            },'我是弹框提示');
        })

        $('#tk2').on('click',function(){
            $.dialog.confirm('您确定要退出吗?', {
                ok: function () {
                    alert('您点击了ok')
                },
                no: function () {
                    alert('您点击了取消')
                }
            });
        })

        $('#tk3').on('click',function(){
            $.dialog.info('请选择支付方式?', {
                actions: [
                    {
                        label: '按钮1', class: 'default', onClick: function () {
                        //alert('我是按钮1')
                       //
                    }
                    },
                    {
                        label: '按钮2', class: 'primary', onClick: function () {
                            $.dialog.alert('密码错误!');
                        }
                    }
                ]
            })
        })

        $('#tk4').on('click',function(){
            $.dialog.alert($('#myText'), function (dialog) {
                //alert('我是密码错误回调')
                dialog.closeDialog()
            },'我是弹框提示');
        })
    });