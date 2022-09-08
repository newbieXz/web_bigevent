$(function () {
    /* 点击去注册账号的链接 */
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    /* 点击去登录的链接 */
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    /* 自定义一个表单规则 */
    const form = layui.form
    const layer = layui.layer
    form.verify({
        /* 定义密码规则 */
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        /* 定义确认密码规则 */
        repwd: function (value) {
            //形参value拿到的是再次确认输入框的值
            if (value != $('.reg-box [name=password]').val()) {
                return '两次输入密码不一致'
            }
        }
    })

    /* 监听注册表单的提交事件 */
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layui.msg(res.massage)
            }
            layui.msg('注册成功，请登录')
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')
                //将登录成功的token字符串保存到localstorage中
                localStorage.setItem('token', res.token)
                //调转到后台主页
                location.href = './assets/index.html'
            }
        })
    })
})