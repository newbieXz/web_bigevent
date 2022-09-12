$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个之间！'
            }
        }
    })

    //获取用户的基本信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                   return layer.msg(res.message)
                }
                //快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置表单的数据
    $('#btnReset').on('click', function (e) {
        //阻止表单默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    //调用父页面中的方法 重新渲染用户名和头像信息
    window.parent.getUserInfo()

})