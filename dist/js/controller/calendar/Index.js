define(['vue','WdatePicker'],
    function (Vue) {
        $(function(){
            $('#calendar_demo').on('click',function(){
                WdatePicker({el:this,onpicking:function(dp){
                    console.log(dp.cal.getNewDateStr())
                }})
            })

            $('#calendar_demo2').on('click',function(){
                WdatePicker({el:this,dateFmt:'yyyy-MM-dd HH:mm:ss',onpicking:function(dp){
                    console.log(dp.cal.getNewDateStr())
                }})
            })

            $('#calendar_demo3').on('click',function(){
                WdatePicker({el:this,dateFmt:'HH:mm:ss',onpicking:function(dp){
                    console.log(dp.cal.getNewDateStr())
                }})
            })

            $('#calendar_demo4').on('focus',function(){

                WdatePicker({el:this,doubleCalendar:true,onpicking:function(dp){
                    console.log(dp.cal.getNewDateStr())
                }})
            })

            //$('#d5221').focus()
            $('#d5221').on('focus',function(){
                //console.log($dp)
                var d5222=$dp.$('d5222');
                WdatePicker({el:this,changed:function(dp){
                    TT()

                }})
            })

            $('#d5222').on('focus',function(){
                console.log('ok')
                WdatePicker({el:$dp.$('d5222'),onpicking:function(dp){

                    console.log('a')

                }})

            })
            //WdatePicker({el:('d5222')})


        })


    });