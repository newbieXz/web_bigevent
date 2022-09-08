$(function () {
    getUserInfo()

    //带年纪按钮实现退出功能
    $('#logOut').on('click', function () {
        layer.confirm('是否退出?', { icon: 3, title: '提示' }, function (index) {
            //1 清除本地存储的token
            localStorage.removeItem('token')
            //2.跳转首页页面
            location.href = '../../assets/login.html'
            layer.close(index);
        });
    })

})

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        //headers是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function (res) {
            /* 渲染用户头像 */
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
        
        //不论成功还是失败都会调用这个函数
        complete: function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //清除token值
                localStorage.removeItem('token')
                //跳转页面
                location.href = '../../index.html'
            }
        }
    })
}

function renderAvatar(user) {
    const name = user.nickname || user.username
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    //按需渲染用户头像
    if (user.user_pic) {
        //渲染图片头像
        $('.layui-nav-avatar').attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        //渲染文字头像
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first)
        $('.layui-nav-avatar').hide()
    }
}