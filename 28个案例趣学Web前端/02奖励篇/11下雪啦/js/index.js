// 开启定时器添加雪花图片
setInterval(function() {
    // 创建一个 img 元素
    var img = $("<img src='./img/snow.png'>")
    // 将 img 元素添加到 body 元素
    $('body').append(img)
    // 设置雪花的尺寸为10~20px
    var size = parseInt(Math.random() * 11) + 10
    img.css('width', size + 'px')
    // 获取屏幕宽度：
    var w = $(window).width()
    // left 取值范围应该是 0 到（屏幕宽度-雪花宽度）
    var left = parseInt(Math.random() * (w - size))
    // 把得到的随机 left 值给到图片
    img.css('left', left + 'px')
    // 添加雪花移动的动画，得到雪花移动的距离 = 屏幕高度-雪花尺寸
    var top = $(window).height() - size
    // 下面注释中的代码是用来清除缓存的，可加可不加
    img.animate({top: top + 'px'}, size * 100)
    // .fadeOut(1000, function() {
    //     // 当动画完成时执行此代码，清除缓存
    //     img.remove()
    // })
}, 10)