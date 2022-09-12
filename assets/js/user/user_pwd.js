$(function () {
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (val) {
            if (val === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (val) {
            if (val) {
                if (val !== $('[name=newPwd]')) {
                    return '新旧密码不一致'
                }
            }
        }
    })

    //实现重置密码功能
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatapwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.mag('更新密码成功')
                //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})