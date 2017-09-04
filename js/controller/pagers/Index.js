define(['vue','utils/pagination'],
    function (Vue) {

        $.Pagination.init({
            dom_box:'#pagers-box',
            defaultCurrent: 1,
            total:500,
            defaultPageSize:20,
            changeCallback:function($this,call_data){
              // $this.defaultProps.total = 100;
                console.log(call_data);
            }
        });
    });