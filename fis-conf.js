/* 通配符的使用方式
   * 匹配任意数量的字符，但不匹配 /
   ? 匹配单个字符，但不匹配 /
   ** 匹配任意数量的字符，包括/，只要它是路径中唯一的一部分
   {} 允许使用一个逗号分割的列表或者表达式
   ! 在模式的开头用于否定一个匹配模式(即排除与模式匹配的信息)
    大多数的人都知道foo/*.js将匹配位于foo/目录下的所有的.js结尾的文件。
    foo/**而将匹配foo/目录以及其子目录中所有以.js结尾的文件。
*/
fis.set('project.ignore', [
    'vendor/**',
    'node_modules/**'
]);
// npm install -g fis3-parser-less-2.x 启动构建less
fis.match('static/less/app.less', {
    rExt: '.css', // from .less to .css
    parser: fis.plugin('less-2.x', {
        // fis-parser-less-2.x option
    })
});

//将less转换出来的css与其他css合并
/*fis.match('static/less/!*.{less,css}', {
  packTo: '/static/erp_app.css'
});*/

// 目录结构 http://naotu.baidu.com/file/bdae8c57e3d46b5d04ec7322b9c47d87?token=3133b940663c1034
fis.match("**.html", {
  parser: fis.plugin("vm")
});

