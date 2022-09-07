/* 
    注意：每次使用$.ajax()或$.get()或$.post()都会先调用
    ajaxPrefilter这个函数 在这个函数中可以拿到ajax提供的配置对象
 */

$.ajaxPrefilter(function (option) {
    //在发起ajax请求之前 统一拼接请求的根路径
    option.url = 'http://ajax.frontend.itheima.net' + option.url
})